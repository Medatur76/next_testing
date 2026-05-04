'use client';
import Camera from "../_components/interactive/Camera";
import CodeBox from "../_components/interactive/CodeBox";
import { min } from "@/src/Utils";
import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";

export default function Session() {
    return (
        <>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: '40%', width: '100%', alignContent: 'center'}}>
                <CodeBox />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', height: 'calc(.25vh + 20px)'}}>
                <div style={{boxShadow: 'gray 0 15px 10px 0', height: '.25vh', width: '80%'}} />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: '90vw', padding: '0 5vw'}}>
                
            </div>
        </>
    )
}

type user = { name: string, id: string };
const empty: user[] = [];

/*function UserHandler() {
    const [users, updateUsers] = useState(empty);
    const peersRef = useRef({});

    useEffect(() => {
        async () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("/api/room")
                .build();

            connection.on("existing", (result) => updateUsers(JSON.parse(result)));

            connection.on("newUser", (result) => {
                updateUsers([...users, JSON.parse(result)])
            });
            
            connection.start().catch((err) => console.error(err)).then(() => connection.send("newConnection", { SessionId: "room1", Name: { First: "John", Last: "Doe" } }));
        }
    }, []);

    return (
        <>
            {users.map((user, i) => (<Camera scope="peer" key={i} connection={peersRef.current[user.id]} name={user.name} width={(25 - 2 * min(users.length, 5)) + "vw"} />))}
        </>
    )
}*/