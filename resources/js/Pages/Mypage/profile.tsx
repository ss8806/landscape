import React, { SyntheticEvent, useEffect } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import Auth from "@/Layouts/Auth";
import EditName from "@/Pages/Mypage/Profile/EditName";
import EditEmail from "@/Pages/Mypage/Profile/EditEmail";
import EditIcon from "@/Pages/Mypage/Profile/EditIcon";
import EditPassword from "@/Pages/Mypage/Profile/EditPassword";
import SuccessMessage from "@/Components/SuccessMessageProfile";
import ErrorMessage from "@/Components/ErrorMessageProfile";

type Props = {
    auth: any;
    user: any;
    success: any;
    error: any;
    errors: any;
};

export default function Profile({ user, auth, success, error }: Props) {
    const { name, email, icon, password } = user;

    useEffect(() => {}, [success]);
    useEffect(() => {}, [error]);

    return (
        <Auth auth={auth}>
            <section className="p-10 text-center">
                {success && <SuccessMessage success={success} />}
                {error && <ErrorMessage error={error} />}

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
