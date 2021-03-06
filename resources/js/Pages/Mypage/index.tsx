import React, { SyntheticEvent, useState } from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Auth from "@/Layouts/Auth";
import route from "ziggy-js";
import SuccessMessage from "@/Components/SuccessMessage";

type Props = {
    auth: any;
    user: any;
    success: any;
    posts: any;
    likes: any;
};

export default function Mypage({ auth, user, success, posts, likes }: Props) {
    const { processing } = useForm({});
    const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";

    return (
        <Auth auth={auth}>
            <section className="p-10 text-center">
                {success && <SuccessMessage success={success} />}
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <p className="text-center m-5 text-2xl">
                        {user.name}のマイページ
                    </p>
                    <div className="text-center">
                        {user.icon ? (
                            <img
                                id="preview"
                                src={awspath + user.icon}
                                className="d-block mx-auto h-60 h-56"
                            ></img>
                        ) : (
                            <img
                                src="/images/avatar-default.svg"
                                className="d-block mx-auto h-60 h-56"
                            />
                        )}
                    </div>
                    <Button processing={processing}>
                        <InertiaLink href="/profile">
                            プロフィール編集
                        </InertiaLink>
                    </Button>
                    <p className="text-center m-5 text-2xl">投稿した記事</p>
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                        {posts.map((post: any) => {
                            return (
                                <div key={post.id} className="">
                                    <div>
                                        {(post.pic1 && (
                                            <img
                                                id="preview"
                                                src={awspath + post.pic1}
                                                className="d-block mx-auto h-60 h-56"
                                            ></img>
                                        )) || (
                                            <img
                                                id="preview"
                                                src="/images/landscape.svg"
                                                className="d-block mx-auto h-60 h-56"
                                            />
                                        )}
                                    </div>
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
                                    <div>
                                        {(like.pic1 && (
                                            <img
                                                id="preview"
                                                src={awspath + like.pic1}
                                                className="d-block mx-auto h-60 h-56"
                                            ></img>
                                        )) || (
                                            <img
                                                id="preview"
                                                src="/images/landscape.svg"
                                                className="d-block mx-auto h-60 h-56"
                                            />
                                        )}
                                    </div>
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
                            href="/likes"
                        >
                            お気に入り一覧へ
                        </InertiaLink>
                    </div>
                </div>
            </section>
        </Auth>
    );
}
