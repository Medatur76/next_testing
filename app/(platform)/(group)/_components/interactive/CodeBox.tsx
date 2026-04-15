//Could use https://www.geeksforgeeks.org/reactjs/build-a-screen-recorder-in-next-js/ in the future to record classes

'use client';
import { useRef, useState } from "react";
import Box from "../ui/Box";

export default function CodeBox() {
    //0: Screenshare
    //1: Raw code (not implemented yet)
    const [mode, setMode] = useState(0);

    if (!mode) {
        const [sharing, setSharing] = useState(false);

        const screen = useRef(null);

        const startSharing = async () => {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
        
                if (screen.current) screen.current.srcObject = stream;

                setSharing(true);

                stream.getVideoTracks()[0].onended = () => setSharing(false);
            } catch (e) {
                //Do something in the box 
            }
        };

        //Copilot code. works lol
        const stopSharing = () => {
            if (screen.current && screen.current.srcObject) {
                const stream = screen.current.srcObject as MediaStream;
                stream.getVideoTracks().forEach(track => track.stop());
                stream.getAudioTracks().forEach(track => track.stop());
                screen.current.srcObject = null;
                setSharing(false);
            }
        };

        return (
            <Box className="cameraBox">
                <video ref={screen} autoPlay />
                <button onClick={sharing ? stopSharing : startSharing}>
                    Share
                </button>
            </Box>
        )
    }
}