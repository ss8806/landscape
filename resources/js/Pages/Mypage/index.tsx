import React, { SyntheticEvent, useState } from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Auth from "@/Layouts/Auth";
import route from "ziggy-js";

type Props = {
    auth: any;
    user: any;
    posts: any;
    likes: any;
};

export default function Mypage({ auth, user, posts, likes }: Props) {
    const { processing } = useForm({});
    return (
        <Auth auth={auth}>
            <section className="pt-6 text-center">
                <p className="text-center m-5 text-2xl">
                    {user.name}のマイページ
                </p>
                <div className="text-center">
                    {user.icon ? (
                        user.icon
                    ) : (
                        <img
                            src="/images/avatar-default.svg"
                            className="d-block mx-auto h-60 h-56"
                        />
                    )}
                </div>
                <Button processing={processing}>
                    <InertiaLink href="/profile">プロフィール編集</InertiaLink>
                </Button>
                <p className="text-center m-5 text-2xl">投稿した記事</p>
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
                                    {post.category_id[0].name}
                                </div>
                                <div className="">{post.title}</div>

                                <InertiaLink
                                    as="button"
                                    className="inline-flex items-center m-2 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150"
                                    // href={route("edit", post.id)}
                                    href={post.show_url}
                                >
                                    編集する
                                </InertiaLink>
                            </div>
                        );
                    })}
                    <InertiaLink
                        as="button"
                        className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 text-2xl text-blue-600 im-2 px-4 py-2 border border-transparent font-semibold "
                        href="/posts"
                    >
                        投稿一覧へ
                    </InertiaLink>
                </div>

                <p className="text-center m-5 text-2xl">お気に入り</p>
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                    {likes.map((like: any) => {
                        return (
                            <div key={like.id} className="">
                                <img
                                    className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
                                    src="https://i.imgur.com/lmYYa2s.png"
                                />
                                <div className="">
                                    カテゴリー：
                                    {like.category_id[0].name}
                                </div>
                                <div className="">{like.title}</div>
                                <InertiaLink
                                    as="button"
                                    className="inline-flex items-center m-2 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150"
                                    // href={route("show", like.article_id)}
                                    href={like.show_url}
                                >
                                    詳細をみる
                                </InertiaLink>
                            </div>
                        );
                    })}
                    <InertiaLink
                        as="button"
                        className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 text-2xl text-blue-600 im-2 px-4 py-2 border border-transparent font-semibold "
                        href="/"
                    >
                        お気に入り一覧へ
                    </InertiaLink>
                </div>
            </section>
        </Auth>
    );
}
