import React, { SyntheticEvent } from "react";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";

type Props = {
    password: string;
};

export default function EditPassword({ password }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        editPassword: password,
    });

    const onHandleChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setData("editPassword", event.target.value);
    };

    const handleSubmitPassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        put("/editPassword");
    };
    return (
        <section className="text-center">
            <ValidationErrors errors={errors} />
            <form onSubmit={handleSubmitPassword}>
                <label htmlFor="inputPassword">パスワード</label>
                <Input
                    id="inputPassword"
                    type="password"
                    name="editPassword"
                    className="mt-1 block mx-auto"
                    placeholder="パスワード"
                    value={data.editPassword}
                    required
                    handleChange={onHandleChangePassword}
                />
                <Button className="ml-4" processing={processing}>
                    パスワードを変更
                </Button>
            </form>
        </section>
    );
}
