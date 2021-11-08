import React, { SyntheticEvent, useEffect } from "react";
import Auth from "@/Layouts/Auth";
import LikeButton from "@/Components/LikeButton";

type Props = {
    auth: any;
    article: any;
};

export default function showArticle({ auth, article }: Props) {
    const { title, body, pic1, user, category_id, initial_is_liked, endpoint } =
        article;

    return (
        <Auth auth={auth}>
            <section className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <h1 className="text-4xl font-bold from-current mb-8">
                        <p className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6">
                            {pic1 ? (
                                <img
                                    className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
                                    src={"pic1"}
                                />
                            ) : (
                                <img
                                    className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
                                    src="https://i.imgur.com/lmYYa2s.png"
                                />
                            )}
                        </p>
                        <p>タイトル：{title}</p>
                        <p>カテゴリー:{category_id[0].name}</p>
                        <p>
                            投稿者:
                            {user.icon ? (
                                user.icon
                            ) : (
                                <img
                                    src="/images/avatar-default.svg"
                                    className="inline-block h-20 h-20 p-2"
                                />
                            )}
                            {user[0].name}
                        </p>
                        <p>{body}</p>
                        {auth.user ? (
                            <LikeButton
                                article={article}
                                auth={auth}
                                initial_is_liked={initial_is_liked}
                                endpoint={endpoint}
                            />
                        ) : (
                            ""
                        )}
                    </h1>
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0"></div>
                </div>
            </section>
        </Auth>
    );
}
