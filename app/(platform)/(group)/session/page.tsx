'use client';
import { testUsersPayload } from "@/src/User";
import Camera from "../_components/interactive/Camera";
import CodeBox from "../_components/interactive/CodeBox";
import { min } from "@/src/Utils";

export default function Session() {
    const users = testUsersPayload(9);

    return (
        <>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: '40%', width: '100%', alignContent: 'center'}}>
                <Camera />
                <CodeBox />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', height: 'calc(.25vh + 20px)'}}>
                <div style={{boxShadow: 'gray 0 15px 10px 0', height: '.25vh', width: '80%'}} />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: '90vw', padding: '0 5vw'}}>
                {users.map((user) => (<Camera user={user} width={(25 - 2 * min(users.length, 5)) + "vw"} />))}
            </div>
        </>
    )
}