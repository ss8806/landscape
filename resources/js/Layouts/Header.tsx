import HeaderLogo from "../Components/HeaderLogo";
import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

interface Props {
    children: React.ReactNode;
}

export default function Header({}: any) {
    return (
        <div className="w-full h-20 flex flex-row justify-between  sm:pt-0 bg-gray-100">
            <div>
                <InertiaLink href="/">
                    <HeaderLogo className="w-20 h-20 ml-10 fill-current text-gray-500" />
                </InertiaLink>
            </div>
            <div>
                <InertiaLink href="/mypage">
                    <p className="w-20 h-20 ml-10 fill-current text-gray-500">
                        Mypage
                    </p>
                </InertiaLink>
            </div>
        </div>
    );
}
