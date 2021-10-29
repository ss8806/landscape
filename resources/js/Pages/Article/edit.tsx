import React, { SyntheticEvent } from "react";
import Auth from "@/Layouts/Auth";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Textarea from "@/Components/Textarea";
import { Inertia } from "@inertiajs/inertia";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";
import Selectbox from "@/Components/Selectbox";
import Option from "@/Components/Option";
import { OperationCanceledException, SelectionRange } from "typescript";
import route from "ziggy-js";
import axios from "axios";

type Props = {
    auth: any;
    article: any;
    categories: any;
};

type Category = {
    id: number;
    name: string;
    category_id: number;
};

export default function editArticle({ auth, article, categories }: Props) {
    const {
        id,
        title,
        body,
        c_id,
        category_id,
    }: {
        id: any;
        title: string;
        body: string;
        c_id: number;
        category_id: any;
    } = article;

    const { data, setData, put, processing, errors } = useForm({
        id: id,
        title: title,
        body: body,
        c_id: c_id,
        category_id: "category_id",
        categories: "",
    });

    const onHandleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setData(
            event.target.name as "title" | "body" | "category_id" | "c_id",
            event.target.value
        );
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // Inertia.put("/article/{id}/update", [id]);
        // put(route("update", { id: id }));

        await axios;
        put(
            route("update", {
                id: id,
                title: title,
                category_id: category_id[0].id,
                body: body,
            })
        );
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (response) {
        //     console.log(response);
        // }
        // );
    };

    const handleSubmitDelete = async (e: SyntheticEvent) => {
        e.preventDefault();
        // Inertia.put("/article/{id}/update", [id]);
        Inertia.delete(route("delete", id));
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
                                placeholder="タイトル"
                                value={data.title}
                                required
                                handleChange={onHandleChange}
                            />
                            <label htmlFor="inputCategory">カテゴリー</label>
                            <Selectbox
                                id="inputCategory"
                                name="category_id"
                                className="w-3/4 mt-1 mb-1 block mx-auto"
                                // value={data.c_id}
                                required
                                multiple={false}
                                handleChange={onHandleChange}
                            >
                                <option value="" className="hidden">
                                    選択してください
                                </option>

                                {/* <option
                                    value={category_id[0].id}
                                    className="hidden"
                                >
                                    {category_id[0].name}
                                </option> */}
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
                            <Button className="ml-4" processing={processing}>
                                編集する
                            </Button>
                        </form>
                        <form onSubmit={handleSubmitDelete}>
                            <Button className="ml-4" processing={processing}>
                                削除する
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </Auth>
    );
}
