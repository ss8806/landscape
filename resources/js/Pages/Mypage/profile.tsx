import React, { SyntheticEvent, useEffect } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import Auth from "@/Layouts/Auth";
import EditName from "@/Pages/Mypage/EditName";
import EditEmail from "@/Pages/Mypage/EditEmail";
import EditIcon from "@/Pages/Mypage/EditIcon";
import EditPassword from "@/Pages/Mypage/EditPassword";
import SuccessMessage from "@/Components/SuccessMessageProfile";

type Props = {
    auth: any;
    user: any;
    success: any;
    errors: any;
};

export default function Profile({ user, auth, success }: Props) {
    const { name, email, icon, password } = user;

    useEffect(() => {}, [success]);

    return (
        <Auth auth={auth}>
            <section className="p-10 text-center">
                {success && <SuccessMessage success={success} />}
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <EditIcon icon={icon}></EditIcon>
                    <EditName name={name}></EditName>
                    <EditEmail email={email}></EditEmail>
                    <EditPassword password={password}></EditPassword>
                </div>
            </section>
        </Auth>
    );
}
