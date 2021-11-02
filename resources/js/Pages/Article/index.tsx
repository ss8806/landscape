import React, { SyntheticEvent, useState, useEffect } from "react";
import Auth from "@/Layouts/Auth";
import Button from "@/Components/Button";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
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
    // // 入力キーワード
    // const [keyword, setKeyword] = useState("");
    // // itemsのListを表示・非表示を切替。onClick で true を渡して表示させる
    // const [showLists, setShowLists] = useState(false);
    // // List 形式で表示するデータ。初期値では検索キーワードを入力していないので上で定義した
    // // products を全件渡している
    // const [filteredProducts, setFilteredProducts] = useState(articles);

    // useEffect(() => {
    //     if (keyword === "") {
    //         setFilteredProducts(articles);
    //         return;
    //     }

    //     const searchKeywords = keyword
    //         .trim()
    //         .toLowerCase()
    //         .match(/[^\s]+/g);

    //     //入力されたキーワードが空白のみの場合
    //     if (searchKeywords === null) {
    //         setFilteredProducts(articles);
    //         return;
    //     }

    //     const result = articles.filter((article: string) =>
    //         searchKeywords.every(
    //             (kw) => article.toLowerCase().indexOf(kw) !== -1
    //         )
    //     );

    //     setFilteredProducts(result.length ? result : ["No Item Found"]);
    // }, [keyword]);
    const [searchKeyword, updateSearchKeyword] = React.useState("");
    const onInput = (event: React.FormEvent<HTMLInputElement>) => {
        updateSearchKeyword(event.currentTarget.value);
    };

    const filteredList = articles.filter((item: any) => {
        const escapedText = escapeStringRegexp(searchKeyword.toLowerCase());
        return new RegExp(escapedText).test(item.title.toLowerCase());
    });
    return (
        <Auth auth={auth}>
            <section className="min-h-screen bg-yellow-400 text-center">
                <input
                    id="search-keyword"
                    type="text"
                    onInput={onInput}
                    placeholder={"input search keyword"}
                />
                <ul className="list">
                    {filteredList.map((item: any) => {
                        return <li key={item.id}>{item.title}</li>;
                    })}
                </ul>
                {/* <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
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
                        })}
                    </div>
                </div> */}
            </section>
        </Auth>
    );
}

{
    /* <Auth auth={auth}>
<section className="min-h-screen bg-yellow-400 text-center p-5">
    <Search />
    <Articles auth={auth} articles={articles}></Articles>
</section>
</Auth> */
}
