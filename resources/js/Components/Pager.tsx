import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";

interface Props {
    links: any;
    c_page: any;
}

const Pager: React.FC<Props> = ({ links, c_page }) => {
    return (
        <nav>
            <ul>
                {links.map((link: any, index: number) => {
                    return (
                        <li
                            key={index}
                            className="{c_page inline-block mt-3 mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500}"
                        >
                            <InertiaLink href={link.url || "#"}>
                                {link.label}
                            </InertiaLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Pager;
