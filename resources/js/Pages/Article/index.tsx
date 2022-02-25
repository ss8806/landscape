import React, { SyntheticEvent, useState, useEffect, useMemo } from "react";
import Auth from "@/Layouts/Auth";
import type { Article } from "@/Types/Article";
import type { Category } from "@/Types/Category";
import SuccessMessage from "@/Components/SuccessMessage";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import moment from "moment";
import Pager from "@/Components/Pager";
import { useForm } from "@inertiajs/inertia-react";

type Props = {
    auth: any;
    success: any;
    articles: any;
    categories: any;
    requests: any;
    keyword: any;
    category: number;
};

export default function Article({
    auth,
    success,
    articles,
    categories,
    keyword,
    category,
}: Props) {
    const { data, setData, get, errors } = useForm({
        search: "",
    });

    const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";

    const onHandleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData(event.target.name as "search", event.target.value);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        get("/");
    };

    return (
        <Auth auth={auth}>
            <section className="min-h-screen  text-center pb-10  ">
                {success && <SuccessMessage success={success} />}
                <form className="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="keyword"
                        value={keyword && keyword.slice(1, -1)}
                        className="m-4 border-solid border border-black"
                        placeholder="タイトルを検索"
                        onChange={onHandleChange}
                    />
                    <select
                        name="category"
                        className="m-4 border-solid border border-black"
                        onChange={onHandleChange}
                    >
                        <option className="hidden" value="">
                            カテゴリー選択
                        </option>
                        <option value="">全て</option>
                        {categories.map((cate: Category) => {
                            return (
                                <option key={cate.id} value={cate.id}>
                                    {cate.name}
                                </option>
                            );
                        })}
                    </select>
                    <button className="inline-flex items-center m-2 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest">
                        検索
                    </button>
                </form>
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                        {articles.data.length ? (
                            articles.data.map((article: Article) => {
                                return (
                                    <div key={article.id} className="">
                                        <div>
                                            {(article.pic1 && (
                                                <img
                                                    id="preview"
                                                    src={awspath + article.pic1}
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
                                        <div className="text-center">
                                            カテゴリー：
                                            {article.c_name[0].name}
                                        </div>
                                        <div className="text-center">
                                            タイトル：
                                            {article.title}
                                        </div>
                                        <div className="text-center">
                                            投稿日：
                                            {moment(article.create).format(
                                                "YYYY年MM月DD日"
                                            )}
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
                <Pager links={articles.links} c_page={articles.current_page} />
                {articles.current_page}/{articles.last_page}
            </section>
        </Auth>
    );
}
