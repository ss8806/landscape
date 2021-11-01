import React from "react";
import Auth from "@/Layouts/Auth";
import Button from "@/Components/Button";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import Articles from "./Articles";

type Props = {
    auth: any;
    articles: any;
};

type Article = {
    id: number;
    title: string;
    show_url: string;
    category_id: any;
    pic1: string;
};

export default function Article({ auth, articles }: Props) {
    return (
        <Auth auth={auth}>
            <section className="min-h-screen bg-yellow-400 text-center p-5">
                aaaa
                <Articles auth={auth} articles={articles}></Articles>
            </section>
        </Auth>
    );
}
