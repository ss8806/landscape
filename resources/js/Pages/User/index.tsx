import React from "react";
import Authenticated from "@/Layouts/Authenticated";
interface User {
    id: number;
    name: string;
}

export default function User(props: any) {
    return (
        // ログインしてないと表示されない
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            {props.users.map((user: User) => {
                return (
                    <div key={user.id} className="c-users">
                        {user.id}
                        {user.name}
                    </div>
                );
            })}
        </Authenticated>
    );
}
