import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import React, { useEffect } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";

interface Props {
    status: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(
            event.target.name as "email" | "password" | "remember",
            event.target.type === "checkbox"
                ? event.target.checked + ""
                : event.target.value
        );
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <Guest>
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label forInput="email" value="メールアドレス" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="パスワード" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            ログイン状態を保持する
                        </span>
                    </label>
                </div>

                <div className="mt-4 mb-4">
                    <Button className="" processing={processing}>
                        ログイン
                    </Button>
                </div>
            </form>
            <InertiaLink
                href={route("register")}
                className="pr-5 underline text-sm text-gray-600 hover:text-gray-900"
            >
                登録してない方はこちら
            </InertiaLink>
            {canResetPassword && (
                <InertiaLink
                    href={route("password.request")}
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                >
                    パスワードを忘れた方はこちら
                </InertiaLink>
            )}
        </Guest>
    );
}
