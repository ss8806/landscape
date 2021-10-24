import React, { SyntheticEvent, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";

type Props = {
    name: string;
};

export default function EditName({ name }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        editName: name, // 初期値は分割代入したものを入れる
    });

    const onHandleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData("editName", event.target.value);
    };

    const handleSubmitName = async (e: SyntheticEvent) => {
        e.preventDefault();
        put("/editName");
    };
    return (
        <section className="text-center">
            <ValidationErrors errors={errors} />
            <form onSubmit={handleSubmitName}>
                <label htmlFor="inputName">お名前</label>
                <Input
                    id="inputName"
                    type="text"
                    name="editName"
                    className="mt-1 block mx-auto"
                    placeholder="お名前"
                    value={data.editName}
                    required
                    // isFocused={true}
                    handleChange={onHandleChangeName}
                />
                <Button className="ml-4" processing={processing}>
                    名前を変更
                </Button>
            </form>
        </section>
    );
}
