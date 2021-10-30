import React, { SyntheticEvent } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import Auth from "@/Layouts/Auth";
import EditName from "./EditName";
import EditEmail from "./EditEmail";
import EditIcon from "./EditIcon";
import EditPassword from "./EditPassword";

type Props = {
    auth: any;
    user: any;
    status: any;
    errors: any;
};

export default function Profile({ user, auth, status }: Props) {
    const { name, email, icon, password } = user;

    return (
        <Auth auth={auth}>
            <section className="pt-6">
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}
                <EditIcon icon={icon}></EditIcon>
                <EditName name={name}></EditName>
                <EditEmail email={email}></EditEmail>
                <EditPassword password={password}></EditPassword>
            </section>
        </Auth>
    );
}
