import React from "react";
import Auth from "@/Layouts/Auth";
import Button from "@/Components/Button";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";

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
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
            <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                {articles.map((article: Article) => {
                    return (
                        <div key={article.id} className="">
                            <img
                                className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
                                src="https://i.imgur.com/lmYYa2s.png"
                            />
                            <div className="text-center">
                                カテゴリー：
                                {article.category_id[0].name}
                            </div>
                            <div className="text-center">{article.title}</div>
                            <div className="text-center">
                                <InertiaLink
                                    as="button"
                                    className="inline-flex items-center m-2 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150"
                                    href={route("show", article.id)}
                                >
                                    詳細を見る
                                </InertiaLink>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
