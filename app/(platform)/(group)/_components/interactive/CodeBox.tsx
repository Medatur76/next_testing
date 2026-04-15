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

        return (
            <Box>
                <video ref={screen} autoPlay />
                <button onClick={startSharing}>
                    Share
                </button>
            </Box>
        )
    }
}