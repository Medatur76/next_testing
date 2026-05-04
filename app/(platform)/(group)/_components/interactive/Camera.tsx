'use client';
import Box from "../ui/Box";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import '../styles/camera.css';

type options = {scope: "client", stream: MediaStream | null, width?: string} | {scope: "peer", connection: RTCPeerConnection, name: string, key: number, width?: string};

export default function Camera(options: options) {
    const [useCamera, setUseCamera] = useState(false), [useMic, setUseMic] = useState(false);
    const camera = useRef<HTMLVideoElement>(null);

    if (options.scope == "client") {
        useEffect(() => {
            if (!camera.current) return;
            camera.current.srcObject = options.stream;
        }, [options.stream]);

        return (
            <Box className={"cameraBox" + (useCamera ? " visual" : "")} width={options.width}>
                {options.stream ? <video autoPlay playsInline ref={camera} /> : <div></div> }
                <div className="optionButtons">
                    <div className="button" /*onClick={useCamera ? stopCamera : startCamera}*/>
                        <FontAwesomeIcon icon={useCamera ? faVideo : faVideoSlash} />
                    </div>
                    <div className="button" /*onClick={useMic ? stopMic : startMic}*/>
                        <FontAwesomeIcon icon={useMic ? faMicrophone : faMicrophoneSlash} />
                    </div>
                </div>
            </Box>
        )
    }

    useEffect(() => {
        options.connection.ontrack = (event) => {
            if (camera.current) {
                camera.current.srcObject = event.streams[0];
            }
        };

        return () => {
            options.connection.ontrack = null;
        };
    }, [options.connection]);

    return (
        <Box className={"cameraBox student" + (useCamera ? " visual" : "")} width={options.width}>
            {useCamera ? <video autoPlay ref={camera} /> : <div style={{width: '100%', height: '100%', flexWrap: 'wrap', display: 'flex', justifyContent: 'center', alignContent: 'center'}}><FontAwesomeIcon size="3x" icon={faVideoSlash} /></div> }
            <div style={{position: 'absolute', left: '20px', padding: '2px 6px', bottom: '0', justifyContent: 'left', marginBottom: '10px', backgroundColor: 'rgba(0,0,0,.1)', borderRadius: '10px', boxShadow: '1px 1px 3px gray'}}>
                {useMic ? undefined : <FontAwesomeIcon icon={faMicrophoneSlash} style={{marginRight: '10px'}}/>}
                {options.name}
            </div>
        </Box>
    )
}