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
import axios from "axios";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Selectbox from "@/Components/Selectbox";

type Props = {
    auth: any;
    success: any;
    articles: any;
    categories: any;
    requests: any;
};

export default function Article({
    auth,
    success,
    articles,
    categories,
}: Props) {
    const { data, setData, get, processing, errors } = useForm({
        search: "",
    });

    const onHandleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData(event.target.name as "search", event.target.value);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        get("/");
    };

    // const handleSubmit = async (e: SyntheticEvent) => {
    //     e.preventDefault();
    //     await axios
    //         .get(route("articles"))
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (response) {
    //             console.log(response);
    //         });
    // };

    // useEffect(() => {
    //     console.log();
    // }, []);

    return (
        <Auth auth={auth}>
            <section className="min-h-screen  text-center pb-10  ">
                {success && <SuccessMessage success={success} />}

                <form className="" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="keyword"
                        className="m-4 border-solid border border-black"
                        placeholder="タイトルを検索"
                        handleChange={onHandleChange}
                    />
                    <Selectbox
                        name="category"
                        className="m-4 border-solid border border-black"
                        handleChange={onHandleChange}
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
                    </Selectbox>
                    <Button className="" processing={processing}>
                        検索
                    </Button>
                </form>

                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                        {articles.data.length ? (
                            articles.data.map((article: Article) => {
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
                                            タイトル：
                                            {article.title}
                                        </div>
                                        <div className="text-center">
                                            登校日：
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
                <Pager links={articles.links} />
            </section>
        </Auth>
    );
}
