import React from "react";
import Header from "@/Layouts/Header";
type Props = {
    articles: any;
};

type Article = {
    id: number;
    title: string;
    category_id: number;
};

export default function Article({ articles }: Props) {
    return (
        <section className="flex flex-wrap">
            {articles.map((article: Article) => {
                return (
                    <div key={article.id} className="flex-initial">
                        <div className="">{article.category_id}</div>
                        <div className="">{article.title}</div>
                    </div>
                );
            })}
        </section>
    );
}
