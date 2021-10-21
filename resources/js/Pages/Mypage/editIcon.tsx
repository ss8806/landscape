import React, { SyntheticEvent, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";

type Props = {
    icon: any;
};

export default function EditIcon({ icon }: Props) {
    const { processing } = useForm({});
    const handleSubmitIcon = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios
            .post("editIcon", {
                icon: icon,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
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
            icon = result;
            console.log(icon);
        };
    };
    return (
        <section className="text-center">
            {(icon && (
                <img id="preview" src="icon" className="d-block mx-auto"></img>
            )) || (
                <img
                    id="preview"
                    src="/images/avatar-default.svg"
                    className="d-block mx-auto"
                />
            )}
            <form onSubmit={handleSubmitIcon}>
                <input
                    name="icon"
                    type="file"
                    className="submitIcon"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={imageHander}
                />
                <Button processing={processing} type="submit">
                    アイコンを編集
                </Button>
            </form>
        </section>
    );
}
