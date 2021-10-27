import React from "react";
import Auth from "@/Layouts/Auth";

type Props = {
    auth: any;
    article: any;
};

// type Article = {
//     id: number;
//     title: string;
//     pic1: string;
//     user_id: string;
//     category_id: string;
// };

export default function showArticle({ auth, article }: Props) {
    const { title, body, pic1, user_id, category_id } = article;
    return (
        <Auth auth={auth}>
            <section className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <h1 className="text-4xl font-bold from-current mb-8">
                        <p>{pic1}</p>
                        <p>タイトル：{title}</p>
                        <p>カテゴリー:{category_id[0].name}</p>
                        <p>投稿者:{user_id[0].name}</p>
                        <p>{body}</p>
                    </h1>
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0"></div>
                </div>
            </section>
        </Auth>
    );
}
