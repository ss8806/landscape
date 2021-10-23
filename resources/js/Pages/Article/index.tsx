import React from "react";
import Header from "@/Layouts/Header";
import Button from "@/Components/Button";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";

type Props = {
    articles: any;
};

type Article = {
    id: number;
    title: string;
    show_url: string;
    category_id: number;
    pic1: string;
};

export default function Article({ articles }: Props) {
    return (
        <Header>
            <section className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <h1 className="text-4xl uppercase font-bold from-current mb-8">
                        Articles
                    </h1>
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                        {articles.map((article: Article) => {
                            return (
                                <div key={article.id} className="">
                                    <img
                                        className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
                                        src="https://i.imgur.com/lmYYa2s.png"
                                    />
                                    <div className="">
                                        {article.category_id}
                                    </div>
                                    <div className="">{article.title}</div>

                                    <InertiaLink
                                        as="button"
                                        href={route("showArticle", article.id)}
                                    >
                                        詳細を見る
                                    </InertiaLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </Header>
    );
}
