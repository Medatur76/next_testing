"use client";

import { useEffect, useState, useRef } from "react";
import Camera from "../../_components/interactive/Camera";
import * as signalR from '@microsoft/signalr';

export default function Test() {
    const [stream, setStream] = useState<MediaStream | null>(null), [peerData, updatePeerData] = useState<{empty: true} | {empty: false, id: string, name: string, connection: RTCPeerConnection}>({empty: true});

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder().withUrl("localhost:5153/api/room").build();

        const addNewConnection = (id: string) => {
            const rtc = new RTCPeerConnection({iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }]});
            if (stream) {
                stream.getTracks().forEach((track) => {
                    rtc.addTrack(track, stream);
                });
                rtc.onicecandidate = (event) => {
                    if (event.candidate) {
                        connection.send("signal", {To: id, Type: "candidate", Data: event.candidate});
                    }
                };
                rtc.onnegotiationneeded = async () => {
                    try {
                        const RTCOffer = await rtc.createOffer();
                        await rtc.setLocalDescription(RTCOffer);
                        connection.send("signal", {To: id, Type: "offer", Data: RTCOffer});
                    } catch (err) {
                        console.error("Negotiation error:", err);
                    }
                };
            }
            return rtc;
        }

        const func = async () => {
            setStream(await navigator.mediaDevices.getUserMedia({video: {aspectRatio: {ideal: 5/3}}, audio: true}));

            connection.on("existing", async (result) => {
                const data = JSON.parse(result)[0], rtc = addNewConnection(data.id);
                
                updatePeerData({empty: false, id: data.id, name: data.name, connection: rtc});
            });

            connection.on("newUser", async (result) => {
                if (!peerData.empty) {
                    console.error("Tried to add a second user");
                    return;
                }
                const data = JSON.parse(result)[0], rtc = addNewConnection(data.id);
                
                updatePeerData({empty: false, id: data.id, name: data.name, connection: rtc});
            });

            connection.on("message", async (data) => {
                if (peerData.empty) {
                    console.error("Unknown user");
                    return;
                }
                const message = typeof data === "string" ? JSON.parse(data) : data;
                const type = message.type ?? message.Type;
                const from = message.from ?? message.From;
                const payload = message.data ?? message.Data;
                if (from != peerData.id) {
                    console.error("Tried to add a second user");
                    return;
                }
                if (!type) return;
                if (type == "missing") {
                    console.error("Missing user: " + from);
                } else if (type == "offer") {
                    try {
                        const current = peerData.connection;
                        await current.setRemoteDescription(new RTCSessionDescription(payload));
                        const answer = await current.createAnswer();
                        await current.setLocalDescription(answer);
                        connection.send("signal", {To: from, Type: "answer", Data: answer});
                    } catch (err) {
                        console.error("Error handling offer:", err);
                    }
                } else if (type == "answer") {
                    try {
                        const current = peerData.connection;
                        const remoteDesc = new RTCSessionDescription(payload);
                        await current.setRemoteDescription(remoteDesc);
                    } catch (err) {
                        console.error("Error handling answer:", err);
                    }
                } else if (type == "candidate") {
                    try {
                        await peerData.connection.addIceCandidate(new RTCIceCandidate(payload));
                    } catch (err) {
                        console.error("Error adding ICE candidate:", err);
                    }
                }
            });

            connection.start().catch((err) => document.write(err)).then(() => connection.send("newConnection", { SessionId: "room1", Name: { First: "John", Last: "Doe" } }));
        };
        
        func();

        /*return () => {
            connection.stop();
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };*/
    }, []);

    return (
        <>
            <Camera scope="client" stream={stream} />
            {peerData.empty ? undefined : <Camera scope="peer" key={0} connection={peerData.connection} name="John Doe" />}
        </>
    )
}