import React, { SyntheticEvent, useState, useEffect } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";
import EditName from "./editName";
import EditEmail from "./editEmail";
import EditIcon from "./editIcon";
import EditPassword from "./editPassword";

type Props = {
    user: any;
    status: any;
    errors: any;
};

export default function Profile({ user, status }: Props) {
    const { name, email, icon, password } = user;

    return (
        <Guest>
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <EditIcon icon={icon}></EditIcon>
            <EditName name={name}></EditName>
            <EditEmail email={email}></EditEmail>
            <EditPassword password={password}></EditPassword>
        </Guest>
    );
}
