import React, { SyntheticEvent, useState } from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Auth from "@/Layouts/Auth";
import route from "ziggy-js";

type Props = {
    auth: any;
    user: any;
    posts: any;
};

export default function Mypage({ auth, user, posts }: Props) {
    const { processing } = useForm({});
    return (
        <Auth auth={auth}>
            <section className="pt-6 text-center">
                <h1 className="text-2xl mb-6">投稿した記事</h1>
            </section>
        </Auth>
    );
}
