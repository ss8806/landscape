import React, { SyntheticEvent, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";

type Props = {
    password: string;
};

export default function EditPassword({ password }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm({
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setData(
            event.target.name as "password" | "password_confirmation",
            event.target.value
        );
    };

    const handleSubmitPassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        put("/editPassword");
    };
    return (
        <section className="text-center">
            <ValidationErrors errors={errors} />
            <form onSubmit={handleSubmitPassword}>
                <label htmlFor="editPassword">パスワード</label>
                <Input
                    id="editPassword"
                    type="password"
                    name="password"
                    className="mt-1 block mx-auto"
                    placeholder="パスワード"
                    value={data.password}
                    required
                    handleChange={onHandleChangePassword}
                />
                <Input
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block mx-auto"
                    placeholder="パスワード確認"
                    handleChange={onHandleChangePassword}
                    required
                />
                <Button className="ml-4" processing={processing}>
                    パスワードを変更
                </Button>
            </form>
        </section>
    );
}
