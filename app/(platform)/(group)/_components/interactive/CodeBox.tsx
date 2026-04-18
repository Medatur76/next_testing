//Could use https://www.geeksforgeeks.org/reactjs/build-a-screen-recorder-in-next-js/ in the future to record classes

'use client';
import { useRef, useState } from "react";
import Box from "../ui/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChromecast } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export default function CodeBox() {
    //0: Screenshare
    //1: Raw code (not implemented yet)
    const [mode, setMode] = useState(0), [sharing, setSharing] = useState(false);

    const screen = useRef(null);

    if (!mode) {

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

        const startSharing = async () => {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
        
                if (screen.current) screen.current.srcObject = stream;

                setSharing(true);

                stream.getVideoTracks()[0].onended = stopSharing;
            } catch (e) {
                //Do something in the box 
            }
        };

        return (
            <Box className={"cameraBox" + (sharing ? " visual" : "")}>
                <video ref={screen} autoPlay />
                <div className="optionButtons">
                    <div className="button" onClick={sharing ? stopSharing : startSharing}>
                        <FontAwesomeIcon icon={faChromecast} />
                    </div>
                </div>
            </Box>
        )
    }
}