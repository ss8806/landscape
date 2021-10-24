import React from "react";
import Header from "@/Layouts/Header";

type Props = {
    article: any;
};

type Article = {
    id: number;
    title: string;
    pic1: string;
    category_id: number;
};

export default function Article({ article }: Props) {
    const { title, body, pic1, user_id, category_id } = article;
    return (
        <Header>
            <section className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <h1 className="text-4xl uppercase font-bold from-current mb-8">
                        <p>{pic1}</p>
                        <p>タイトル：{title}</p>
                        <p>本文:{body}</p>
                        <p>投稿者:{user_id}</p>
                        <p>カテゴリー:{category_id}</p>
                    </h1>
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0"></div>
                </div>
            </section>
        </Header>
    );
}
