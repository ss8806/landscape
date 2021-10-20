import React, { SyntheticEvent, useState, useEffect, useRef } from "react";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";

type Props = {
    icon: File;
};

export default function EditIcon({ icon }: Props) {
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
            return result;
        };
    };
    return (
        <section className="text-center">
            {(icon && <img src="icon" className="d-block mx-auto"></img>) || (
                <img
                    id="preview"
                    src="/images/avatar-default.svg"
                    className="d-block mx-auto"
                />
            )}

            <input
                type="file"
                className="mx-auto"
                accept="image/png, image/jpeg, image/gif"
                onChange={imageHander}
            />
        </section>
    );
}
