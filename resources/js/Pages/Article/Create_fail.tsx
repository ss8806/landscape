import React, { SyntheticEvent, useEffect, useState } from "react";
import Auth from "@/Layouts/Auth";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Textarea from "@/Components/Textarea";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";
import Selectbox from "@/Components/Selectbox";
import type { Category } from "@/Types/Category";
import axios from "axios";

type Props = {
    auth: any;
    categories: any;
    pic1: HTMLImageElement;
};

export default function createArticle({ auth, categories }: Props) {
    const awspath =
        "https://backend0622.s3.ap-northeast-1.amazonaws.com/mydata/";
    let title = "";
    let body = "";
    let category_id = "";
    let pic1 = "";
    // const { data, setData, post, processing, errors } = useForm({
    //     title: "",
    //     body: "",
    //     category_id: "",
    //     pic1: "",
    // });

    // const onHandleChange = (
    //     event: React.ChangeEvent<
    //         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    //     >
    // ) => {
    //     setData(
    //         event.target.name as "title" | "body" | "category_id" | "pic1",
    //         event.target.value
    //     );
    // };

    const { processing } = useForm({});

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post("/article/store", {
            title: title,
            category_id: category_id,
            pic1: pic1,
            body: body,
        });
    };

    const imageHander = (event: any) => {
        if (event.target.files === null) {
            return;
        }
        const file = event.target.files[0];
        if (file === null) {
            return;
        }
        let imgTag = document.getElementById("preview") as HTMLImageElement;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result: string = reader.result as string;
            imgTag.src = result;
            pic1 = result;
            //console.log(pic1);
        };
    };

    return (
        <Auth auth={auth}>
            <section className="min-h-screen bg-yellow-400 py-20">
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <div className="text-center">
                        {/* <ValidationErrors errors={errors} /> */}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="inputTitle">タイトル</label>
                            <input
                                id="inputTitle"
                                type="text"
                                name="title"
                                className="w-3/4 mt-1 mb-1 block mx-auto"
                                placeholder="タイトルを検索"
                                required
                            />
                            <label htmlFor="inputTitle">カテゴリー</label>
                            <select
                                id="inputTitle"
                                name="category_id"
                                className="w-3/4 mt-1 mb-1 block mx-auto"
                                required
                            >
                                <option value="" className="hidden">
                                    選択してください
                                </option>
                                {categories.map((category: Category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>

                            <label htmlFor="inputBody">画像</label>
                            <section className="text-center">
                                <div>
                                    {pic1 || (
                                        <img
                                            id="preview"
                                            src="/images/avatar-default.svg"
                                            className="d-block mx-auto h-60 h-56"
                                        />
                                    )}
                                </div>
                            </section>
                            <input
                                name="pic1"
                                type="file"
                                className="submitPic1"
                                accept="image/png, image/jpeg, image/gif"
                                onChange={imageHander}
                            />

                            <label htmlFor="inputBody">本文</label>
                            <textarea
                                id="inputBody"
                                name="body"
                                className="w-3/4 h-64 mt-1 mb-1 block mx-auto"
                                placeholder="本文"
                                required
                            />
                            <Button className="ml-4" processing={processing}>
                                投稿する
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </Auth>
    );
}
