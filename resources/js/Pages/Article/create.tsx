import React, { SyntheticEvent, useEffect, useState } from "react";
import Auth from "@/Layouts/Auth";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Textarea from "@/Components/Textarea";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";
import Selectbox from "@/Components/Selectbox";
import type { Category } from "@/Types/Category";
import { Inertia } from "@inertiajs/inertia";
import route from "ziggy-js";
import axios from "axios";

type Props = {
    auth: any;
    categories: any;
    title: string;
    body: string;
    category_id: number;
    pic1: any;
};

export default function createArticle({
    auth,
    categories,
    title,
    body,
    category_id,
    pic1,
}: Props) {
    // const awspath =
    //     "https://backend0622.s3.ap-northeast-1.amazonaws.com/mydata/";

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        body: "",
        category_id: "",
        pic1: "",
    });

    const onHandleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setData(
            event.target.name as "title" | "body" | "category_id",
            event.target.value
        );
    };

    const onHandleFileChange = (event: React.ChangeEvent<any>) => {
        setData("pic1", event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // Inertia.post(route("store"));
        post("/article/store");
        // axios.post(
        //     route("store", {
        //         title: title,
        //         category_id: category_id,
        //         pic1: pic1,
        //         body: body,
        //     })
        // );
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
            // result.replace(/data:.*\/.*;base64,/, "");
            imgTag.src = result;
            pic1 = result.replace(/data:.*\/.*;base64,/, "");
            console.log(event.target.files[0]);
        };
        // setData(event.target.name as "pic1", event.target.src);
        setData(event.target.name as "pic1", event.target.files[0]);
    };

    return (
        <Auth auth={auth}>
            <section className="min-h-screen bg-yellow-400 py-20">
                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <div className="text-center">
                        <ValidationErrors errors={errors} />
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="inputTitle">タイトル</label>
                            <Input
                                id="inputTitle"
                                type="text"
                                name="title"
                                className="w-3/4 mt-1 mb-1 block mx-auto"
                                placeholder="タイトルを検索"
                                value={data.title}
                                required
                                handleChange={onHandleChange}
                            />
                            <label htmlFor="inputTitle">カテゴリー</label>
                            <Selectbox
                                id="inputTitle"
                                name="category_id"
                                className="w-3/4 mt-1 mb-1 block mx-auto"
                                value={data.category_id}
                                required
                                handleChange={onHandleChange}
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
                            </Selectbox>

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
                                <input
                                    name="pic1"
                                    type="file"
                                    // src={data.pic1}
                                    // value={data.pic1}
                                    className="m-auto"
                                    accept="image/*"
                                    onChange={onHandleFileChange}
                                />
                            </section>

                            <label htmlFor="inputBody">本文</label>
                            <Textarea
                                id="inputBody"
                                name="body"
                                className="w-3/4 h-64 mt-1 mb-1 block mx-auto"
                                placeholder="本文"
                                value={data.body}
                                required
                                handleChange={onHandleChange}
                            />
                            <Button
                                className="ml-4"
                                processing={processing}
                                type="submit"
                            >
                                投稿する
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </Auth>
    );
}
