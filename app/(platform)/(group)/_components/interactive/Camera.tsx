'use client';
import { User } from "@/src/User";
import Box from "../ui/Box";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import '../styles/camera.css';

export default function Camera(options: {user?: User, width?: string}) {
    const [useCamera, setUseCamera] = useState(false), [useMic, setUseMic] = useState(false);
    const camera = useRef(null), mic = useRef(null);

    if (!options.user) {

        //Copilot code. works lol
        const stopCamera = () => {
            if (camera.current && camera.current.srcObject) {
                const stream = camera.current.srcObject as MediaStream;
                stream.getVideoTracks().forEach(track => track.stop());
                camera.current.srcObject = null;
                setUseCamera(false);
            }
        };

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({video: true});
        
                if (camera.current) camera.current.srcObject = stream;

                setUseCamera(true);

                stream.getVideoTracks()[0].onended = stopCamera;
            } catch (e) {
                //Do something in the box 
            }
        };

        //Copilot code. works lol
        const stopMic = () => {
            if (mic.current && mic.current.srcObject) {
                const stream = mic.current.srcObject as MediaStream;
                stream.getAudioTracks().forEach(track => track.stop());
                mic.current.srcObject = null;
                setUseMic(false);
            }
        };

        const startMic = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        
                if (mic.current) mic.current.srcObject = stream;

                setUseMic(true);

                stream.getVideoTracks()[0].onended = stopMic;
            } catch (e) {
                //Do something in the box 
            }
        };

        return (
            <Box className={"cameraBox" + (useCamera ? " visual" : "")} width={options.width}>
                <video autoPlay ref={camera} />
                <div className="optionButtons">
                    <div className="button" onClick={useCamera ? stopCamera : startCamera}>
                        <FontAwesomeIcon icon={useCamera ? faVideo : faVideoSlash} />
                    </div>
                    <div className="button" onClick={useMic ? stopMic : startMic}>
                        <FontAwesomeIcon icon={useMic ? faMicrophone : faMicrophoneSlash} />
                    </div>
                </div>
            </Box>
        )
    }

    return (
        <Box className={"cameraBox student" + (useCamera ? " visual" : "")} width={options.width}>
            {useCamera ? <video autoPlay ref={camera} /> : <div style={{width: '100%', height: '100%', flexWrap: 'wrap', display: 'flex', justifyContent: 'center', alignContent: 'center'}}><FontAwesomeIcon size="3x" icon={faVideoSlash} /></div> }
            <div style={{position: 'absolute', left: '20px', padding: '2px 6px', bottom: '0', justifyContent: 'left', marginBottom: '10px', backgroundColor: 'rgba(0,0,0,.1)', borderRadius: '10px', boxShadow: '1px 1px 3px gray'}}>
                {useMic ? undefined : <FontAwesomeIcon icon={faMicrophoneSlash} style={{marginRight: '10px'}}/>}
                {options.user.name.last + ", " + options.user.name.first}
            </div>
        </Box>
    )
}