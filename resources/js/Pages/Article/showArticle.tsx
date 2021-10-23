import React from "react";
import Header from "@/Layouts/Header";

type Props = {
    article: any;
};

type Article = {
    id: number;
    title: string;
    category_id: number;
    pic1: string;
};

export default function Article({ article }: Props) {
    return (
        <Header>
            <section className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <h1 className="text-4xl uppercase font-bold from-current mb-8">
                        <p>{article.pic1}</p>
                        <p>タイトル：{article.title}</p>
                        <p>本文:{article.body}</p>
                    </h1>
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0"></div>
                </div>
            </section>
        </Header>
    );
}
