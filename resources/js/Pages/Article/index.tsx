import React, { SyntheticEvent, useState, useEffect, useMemo } from "react";
import Auth from "@/Layouts/Auth";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
    auth: any;
    status: any;
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
    create: number;
};

type Category = {
    id: number;
    name: string;
    c_id: number;
};

export default function Article({ auth, status, articles, categories }: Props) {
    // 検索条件
    const [filterQuery, setFilterQuery] = useState<any>({});
    // ソート条件
    const [sort, setSort] = useState<any>({});

    let [isSorted, setSorted] = useState<boolean>(true);

    const filteredTask = useMemo(() => {
        let tmpArticles = articles;

        // 入力した文字は小文字にする
        const filterTitle =
            filterQuery.title && filterQuery.title.toLowerCase();

        // 絞り込み検索
        tmpArticles = tmpArticles.filter((row: Article) => {
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
            tmpArticles = tmpArticles.sort((a: any, b: any) => {
                a = a[sort.key];
                b = b[sort.key];
                return (a === b ? 0 : a > b ? 1 : -1) * sort.order;
            });
        }

        return tmpArticles;
        //第2引数の配列を指定することで、この変数の変化がある度にこの部分の処理が実行されます。
    }, [filterQuery, sort]);

    // 入力した情報をfilterQueryに入れる
    const handleFilter = (e: any) => {
        const { name, value } = e.target;
        setFilterQuery({ ...filterQuery, [name]: value });
    };

    // 選択したカラムをSortに入れる;
    const handleSort = (column: any) => {
        if (sort.key === column) {
            // カラムを設定した場合は逆順になるようにorderをマイナスにします。
            setSorted(!isSorted);
            setSort({ ...sort, order: -sort.order });
        } else {
            setSorted(!isSorted);
            setSort({
                key: column,
                order: 1,
            });
        }
    };

    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setTimeout(() => {
            handleClose();
        }, 3000);
    }, [status]);

    return (
        <Auth auth={auth}>
            <section className="min-h-screen  text-center pb-10  ">
                {status && (
                    <div className="">
                        <Stack spacing={2} sx={{ width: "100%" }}>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                            >
                                <Alert severity="success">{status}</Alert>
                            </Snackbar>
                        </Stack>
                    </div>
                )}
                <input
                    type="text"
                    name="title"
                    className="m-4 border-solid border border-black"
                    placeholder="タイトル"
                    value={filterQuery.title || ""}
                    onChange={handleFilter}
                />

                <select
                    name="c_id"
                    className="m-4 border-solid border border-black"
                    value={filterQuery.c_id}
                    onChange={handleFilter}
                >
                    <option value="">カテゴリー選択</option>
                    {categories.map((cate: Category) => {
                        return (
                            <option key={cate.id} value={cate.id}>
                                {cate.name}
                            </option>
                        );
                    })}
                </select>

                <button
                    className="w-60 m-4 p-2 bg-white text-base border-solid border border-black"
                    onClick={() => handleSort("id")}
                >
                    {isSorted
                        ? "登録を古い順に並べ替え"
                        : "登録を新しい順に並べ替え"}
                </button>

                {/* 
                カテゴリーの並べ替え
                <button onClick={() => handleSort("c_id")}>カテゴリー</button> 
                */}

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
            </section>
        </Auth>
    );
}
