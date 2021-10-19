import React, { SyntheticEvent, useState } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";

type Props = {
    status: string;
    user: any;
};

export default function Profile({ status, user }: Props) {
    const { name } = user; // バックエンドからのPropsを分割代入
    const { data, setData, post, processing, errors } = useForm({
        editName: name, // 初期値は分割代入したものを入れる
    });

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData("editName", event.target.value);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        post("/editName");
    };
    return (
        <Guest>
            <div className="text-center">
                <img
                    src="/images/avatar-default.svg"
                    className="d-block mx-auto"
                />
                <InertiaLink href="/edit">画像を編集</InertiaLink>
            </div>
            <div className="text-center">
                <form onSubmit={handleSubmit}>
                    <section className="text-center">
                        <label htmlFor="inputName">お名前</label>
                        <Input
                            type="text"
                            name="editName"
                            className="mt-1 block mx-auto"
                            placeholder="お名前"
                            value={data.editName}
                            required
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                        <Button className="ml-4" processing={processing}>
                            名前を編集
                        </Button>
                    </section>
                </form>
            </div>
        </Guest>
    );
}
