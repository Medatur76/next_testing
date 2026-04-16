'use client';
import { User } from "@/src/User";
import Box from "../ui/Box";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import '../styles/camera.css';

export default function Camera(options: {user?: User}) {
    if (!options.user) {

        const [useCamera, setUseCamera] = useState(false);

        const camera = useRef(null);

        const startSharing = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        
                if (camera.current) camera.current.srcObject = stream;

                setUseCamera(true);

                stream.getVideoTracks()[0].onended = () => setUseCamera(false);
            } catch (e) {
                //Do something in the box 
            }
        };

        //Copilot code. works lol
        const stopSharing = () => {
            if (camera.current && camera.current.srcObject) {
                const stream = camera.current.srcObject as MediaStream;
                stream.getVideoTracks().forEach(track => track.stop());
                stream.getAudioTracks().forEach(track => track.stop());
                camera.current.srcObject = null;
                setUseCamera(false);
            }
        };

        return (
            <Box className="cameraBox">
                <video autoPlay ref={camera} />
                <div className="optionButtons">
                    <div className="button" onClick={useCamera ? stopSharing : startSharing}>
                        <FontAwesomeIcon icon={useCamera ? faVideoSlash : faVideo} />
                    </div>
                </div>
            </Box>
        )
    }
}