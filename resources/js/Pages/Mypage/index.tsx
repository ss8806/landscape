import React, { SyntheticEvent, useState } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

type Props = {
    user: any;
};

export default function Mypage({ user }: Props) {
    return (
        <>
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
            <div className="text-center blue">
                <InertiaLink href="/profile">プロフィール編集</InertiaLink>
            </div>
            <p className="text-center">投稿した記事</p>
            <p className="text-center">お気に入り</p>
        </>
    );
}
