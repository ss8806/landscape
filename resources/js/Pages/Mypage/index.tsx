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
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                    {posts.map((post: any) => {
                        return (
                            <div key={post.id} className="">
                                <img
                                    className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
                                    src="https://i.imgur.com/lmYYa2s.png"
                                />
                                <div className="">
                                    カテゴリー：
                                    {/* {post.category_id} */}
                                    {post.category_id[0].name}
                                </div>
                                <div className="">{post.title}</div>

                                <InertiaLink
                                    as="button"
                                    href={route("edit", post.id)}
                                >
                                    編集する
                                </InertiaLink>
                            </div>
                        );
                    })}
                </div>
                <p className="text-center">お気に入り</p>
            </section>
        </Auth>
    );
}
