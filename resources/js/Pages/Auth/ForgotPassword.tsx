import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import React from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import { useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";

interface Props {
    status: string;
}

export default function ForgotPassword({ status }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData("email", event.target.value);
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <Guest>
            <div className="mb-4 text-sm text-gray-500 leading-normal">
                パスワードを忘れた場合 パスワードを忘れた場合
                ご登録いただいております、メールアドレスを入力してください。登録メールアドレスにパスワード再設定用のURLをお送りいたします。
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <Input
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        パスワード再設定メールを送る
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
