'use client';
import Webcam from "react-webcam";
import { User } from "@/src/User";
import Box from "../ui/Box";

export default function Camera(options: {user?: User}) {
    if (!options.user) return (
        <Box>
            <Webcam 
            audio={true}
            screenshotFormat="image/jpeg"
            width={640}
            height={480} />
        </Box>
    )
}