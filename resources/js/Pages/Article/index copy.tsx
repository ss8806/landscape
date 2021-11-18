import React, { SyntheticEvent, useState, useEffect, useMemo } from "react";
import Auth from "@/Layouts/Auth";
import type { Article } from "@/Types/Article";
import type { Category } from "@/Types/Category";
import SuccessMessage from "@/Components/SuccessMessage";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import moment from "moment";
import Pager from "@/Components/Pager";

type Props = {
    auth: any;
    success: any;
    articles: any;
    categories: any;
    pager: any;
    sum: number;
    per: number;
    onChange: (e: { page: number }) => void;
};

export default function Article({ auth, success, articles }: Props) {
    return (
        <Auth auth={auth}>
            <section className="min-h-screen  text-center pb-10  ">
                {success && <SuccessMessage success={success} />}
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
                        {articles.data.map((article: Article) => {
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
                        })}
                    </div>
                </div>
                <Pager links={articles.links} />
            </section>
        </Auth>
    );
}
