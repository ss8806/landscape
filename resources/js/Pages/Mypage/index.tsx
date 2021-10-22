import React, { SyntheticEvent, useState } from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Header from "@/Layouts/Header";

type Props = {
    user: any;
};

export default function Mypage({ user }: Props) {
    const { processing } = useForm({});
    return (
        <Header>
            <section className="pt-6 text-center">
                <p className="text-center">{user.name}のマイページ</p>
                <div className="text-center">
                    {user.icon ? (
                        user.icon
                    ) : (
                        <img
                            src="/images/avatar-default.svg"
                            className="d-block mx-auto"
                        />
                    )}
                </div>
                <Button processing={processing}>
                    <InertiaLink href="/profile">プロフィール編集</InertiaLink>
                </Button>
                <p className="text-center">投稿した記事</p>
                <p className="text-center">お気に入り</p>
            </section>
        </Header>
    );
}
