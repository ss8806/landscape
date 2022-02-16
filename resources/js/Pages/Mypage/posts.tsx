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
    const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
    return (
        <Auth auth={auth}>
            <section className="p-10 text-center">
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <h1 className="text-2xl mb-6">投稿した記事</h1>
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
                    </div>
                </div>
            </section>
        </Auth>
    );
}
