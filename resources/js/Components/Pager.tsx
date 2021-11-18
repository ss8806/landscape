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
                        <li>
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
