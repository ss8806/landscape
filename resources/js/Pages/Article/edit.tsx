import React, { SyntheticEvent } from "react";
import Auth from "@/Layouts/Auth";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Textarea from "@/Components/Textarea";
import { Inertia } from "@inertiajs/inertia";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";
import Selectbox from "@/Components/Selectbox";
import route from "ziggy-js";

type Props = {
    auth: any;
    article: any;
    categories: any;
    category: any;
};

type Category = {
    id: number;
    name: string;
    c_id: any;
    c_name: any;
};

export default function editArticle({ auth, article, categories }: Props) {
    let {
        id,
        title,
        body,
        c_id,
        c_name,
        pic1,
    }: {
        id: number;
        title: string;
        body: string;
        c_id: any;
        c_name: any;
        pic1: string;
        category_id: number;
    } = article;

    const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
    const { data, setData, post, put, processing, errors } = useForm({
        id: id,
        title: title,
        body: body,
        c_id: c_id,
        // c_name: c_name,
        // categories: categories,
        pic1: pic1,
    });

    const onHandleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setData(
            event.target.name as "title" | "body" | "pic1" | "c_id",
            event.target.value
        );
    };

    const onHandleChangeOption = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData(event.target.name as "c_id", event.target.value);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        post(
            route("update", {
                id: id,
                title: title,
                category_id: c_id,
                // body: body,
                pic1: pic1,
            })
        );

        // await axios;
        // put(
        //     route("update", {
        //         id: id,
        //         title: title,
        //         c_name: c_name[0].id,
        //         body: body,
        //     })
        // );
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
        Inertia.delete(route("delete", id));
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
            pic1 = result.replace(/data:.*\/.*;base64,/, "");
            // console.log(pic1);
        };
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
                                placeholder="タイトル"
                                value={data.title}
                                required
                                handleChange={onHandleChange}
                            />
                            <label htmlFor="inputCategory">カテゴリー</label>
                            <Selectbox
                                id="inputCategory"
                                name="category"
                                className="w-3/4 mt-1 mb-1 block mx-auto"
                                //value={data.category_id}
                                //value={data.c_id}
                                required
                                multiple={false}
                                handleChange={onHandleChangeOption}
                            >
                                <option value={c_name[0].id} className="hidden">
                                    {c_name[0].name}
                                </option>
                                {categories.map(
                                    (category: any, index: number) => {
                                        return (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    }
                                )}
                            </Selectbox>
                            <label htmlFor="inputBody">画像</label>

                            <section className="text-center">
                                <div>
                                    {(pic1 && (
                                        <img
                                            id="preview"
                                            src={awspath + pic1}
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
                            </section>
                            <input
                                name="pic1"
                                type="file"
                                src={data.pic1}
                                className="m-auto"
                                accept="image/png, image/jpeg, image/gif"
                                onChange={imageHander}
                            />
                            <section>
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
                            </section>
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
