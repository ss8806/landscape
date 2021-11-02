import React, { SyntheticEvent, useState, useEffect, useMemo } from "react";
import Auth from "@/Layouts/Auth";
import Button from "@/Components/Button";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import escapeStringRegexp from "escape-string-regexp";
import Selectbox from "@/Components/Selectbox";

type Props = {
    auth: any;
    articles: any;
    categories: any;
};

type Article = {
    id: number;
    title: string;
    show_url: string;
    c_id: number;
    c_name: any;
    pic1: string;
};

type Category = {
    id: number;
    name: string;
    c_id: number;
};

export default function Article({ auth, articles, categories }: Props) {
    // ユーザーの入力キーワードをState化する
    // const [searchKeyword, updateSearchKeyword] = React.useState("");

    // // 入力イベントに反応してStateを更新する
    // const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    //     // 入力キーワードをstateに格納する
    //     updateSearchKeyword(event.currentTarget.value);
    // };

    // const filteredList = articles.filter((item: any) => {
    //     // ユーザー入力を安全に正規表現にする（このときすべて小文字化で正規化する）
    //     const escapedText = escapeStringRegexp(searchKeyword.toLowerCase());
    //     // 小文字で比較して部分一致するものだけを残す
    //     return new RegExp(escapedText).test(item.title.toLowerCase());
    // });

    // タスク
    const [tasks, setTasks] = useState<any>(articles);
    // カテゴリー
    const [cates, setCategories] = useState<any>(categories);
    // 検索条件
    const [filterQuery, setFilterQuery] = useState<any>({});
    // ソート条件
    const [sort, setSort] = useState<any>({});

    const filteredTask = useMemo(() => {
        let tmpTasks = tasks;

        // 入力した文字は小文字にする
        const filterTitle =
            filterQuery.title && filterQuery.title.toLowerCase();

        // 絞り込み検索
        tmpTasks = tmpTasks.filter((row: any) => {
            // タイトルで絞り込み
            if (
                filterQuery.title &&
                String(row.title).toLowerCase().indexOf(filterTitle) === -1
            ) {
                return false;
            }

            // カテゴリーで絞り込み
            if (filterQuery.c_id && row.c_id !== parseInt(filterQuery.c_id)) {
                return false;
            }
            return row;
        });

        // ソート
        if (sort.key) {
            tmpTasks = tmpTasks.sort((a: any, b: any) => {
                a = a[sort.key];
                b = b[sort.key];
                return (a === b ? 0 : a > b ? 1 : -1) * sort.order;
            });
        }

        return tmpTasks;
        //第2引数の配列を指定することで、この変数の変化がある度にこの部分の処理が実行されます。
    }, [filterQuery, sort, tasks]);

    // 入力した情報をfilterQueryに入れる
    const handleFilter = (e: any) => {
        const { name, value } = e.target;
        setFilterQuery({ ...filterQuery, [name]: value });
    };

    // 選択したカラムをSortに入れる
    // const handleSort = (column: any) => {
    //     if (sort.key === column) {
    //         setSort({ ...sort, order: -sort.order });
    //     } else {
    //         setSort({
    //             key: column,
    //             order: 1,
    //         });
    //     }
    // };

    return (
        <Auth auth={auth}>
            <section className="min-h-screen bg-yellow-400 text-center p-10">
                <input
                    type="text"
                    name="title"
                    className="form-input"
                    placeholder="タイトル"
                    value={filterQuery.title || ""}
                    onChange={handleFilter}
                />

                <select
                    name="c_id"
                    value={filterQuery.c_id}
                    onChange={handleFilter}
                >
                    <option value="">カテゴリー選択</option>
                    {cates.map((cate: Category) => {
                        return (
                            <option key={cate.id} value={cate.id}>
                                {cate.name}
                            </option>
                        );
                    })}
                </select>

                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                        {filteredTask.length ? (
                            filteredTask.map((article: Article) => {
                                return (
                                    <div key={article.id} className="">
                                        <img
                                            className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
                                            src="https://i.imgur.com/lmYYa2s.png"
                                        />
                                        <div className="text-center">
                                            カテゴリー：
                                            {article.c_name[0].name}
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
