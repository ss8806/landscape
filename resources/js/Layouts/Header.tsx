import HeaderLogo from "../Components/HeaderLogo";
import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

interface Props {
    children: React.ReactNode;
}

export default function Header({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col  pt-6 sm:pt-0 bg-gray-100">
            <div>
                <InertiaLink href="/">
                    <HeaderLogo className="w-20 h-20 ml-10 fill-current text-gray-500" />
                </InertiaLink>
            </div>

            <div className="w-full min-h-screen sm:max-w-fullmt bg-white shadow-md overflow-hidden">
                {children}
            </div>
        </div>
    );
}
