import Camera from "../_components/interactive/Camera";
import CodeBox from "../_components/interactive/CodeBox";

export default function Session() {
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Camera />
                <CodeBox />
            </div>
            <div></div>
        </>
    )
}