import React, { SyntheticEvent } from "react";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";

type Props = {
    email: string;
};

export default function EditEmail({ email }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        editEmail: email,
    });

    const onHandleChangeEmail = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setData("editEmail", event.target.value);
    };

    const handleSubmitEmail = async (e: SyntheticEvent) => {
        e.preventDefault();
        put("/editEmail");
    };
    return (
        <section className="text-center">
            <ValidationErrors errors={errors} />
            <form onSubmit={handleSubmitEmail}>
                <label htmlFor="inputEmail">email</label>
                <Input
                    id="inputEmail"
                    type="email"
                    name="editEmail"
                    className="mt-1 block mx-auto"
                    placeholder="メールアドレス"
                    value={data.editEmail}
                    required
                    handleChange={onHandleChangeEmail}
                />
                <Button className="ml-4" processing={processing}>
                    メールアドレスを変更
                </Button>
            </form>
        </section>
    );
}
