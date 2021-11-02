import React, { SyntheticEvent, useState, useEffect } from "react";
import Auth from "@/Layouts/Auth";
import Button from "@/Components/Button";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import escapeStringRegexp from "escape-string-regexp";

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
    // ユーザーの入力キーワードをState化する
    const [searchKeyword, updateSearchKeyword] = React.useState("");
    // 入力イベントに反応してStateを更新する
    const onInput = (event: React.FormEvent<HTMLInputElement>) => {
        // 入力キーワードをstateに格納する
        updateSearchKeyword(event.currentTarget.value);
    };

    const filteredList = articles.filter((item: any) => {
        // ユーザー入力を安全に正規表現にする（このときすべて小文字化で正規化する）
        const escapedText = escapeStringRegexp(searchKeyword.toLowerCase());
        // 小文字で比較して部分一致するものだけを残す
        return new RegExp(escapedText).test(item.title.toLowerCase());
    });
    return (
        <Auth auth={auth}>
            <section className="min-h-screen bg-yellow-400 text-center p-10">
                <input
                    id="search-keyword"
                    type="text"
                    onInput={onInput}
                    placeholder={"キーワード検索"}
                />
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                        {filteredList.length ? (
                            filteredList.map((article: Article) => {
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
                                        <div className="text-center">
                                            {article.title}
                                        </div>
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
                            })
                        ) : (
                            <p>該当なし</p>
                        )}
                    </div>
                </div>
            </section>
        </Auth>
    );
}
