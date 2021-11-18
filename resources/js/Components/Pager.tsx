import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useEffect, useRef } from "react";

interface Props {
    links: any;
}

const Pager: React.FC<Props> = ({ links }) => {
    return (
        <nav>
            <ul>
                {links.map((link: any, index: number) => {
                    return (
                        <li
                            key={index}
                            className="inline-block mt-3 mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500"
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
