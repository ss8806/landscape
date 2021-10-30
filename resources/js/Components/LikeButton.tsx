import React, { SyntheticEvent, useState } from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Auth from "@/Layouts/Auth";
import route from "ziggy-js";
import axios from "axios";

type Props = {
    auth: any;
    article: any;
    initial_is_liked: boolean;
    endpoint: string;
};

export default function LikeButton({
    auth,
    article,
    initial_is_liked,
    endpoint,
}: Props) {
    let isLiked = initial_is_liked;

    const handleLike = async (e: SyntheticEvent) => {
        e.preventDefault();
        // await axios.put(endpoint);
        await axios.put("like", {
            article: article.id,
        });
        isLiked = true; // ハートを赤くする
        alert("気になるリストに登録しました");
    };

    const handleUnLike = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.delete(endpoint);
        isLiked = false; // ハートを赤くする
        alert("気になるリストから削除しました");
    };

    const handleClickLike = isLiked ? handleUnLike : handleLike;

    return (
        <button
            type="button"
            className="c-btn c-btn__like "
            onClick={handleClickLike}
        >
            <div> {isLiked ? "解除" : "気になる"}</div>
            <div>
                {isLiked ? (
                    <svg
                        className="fill-current h-8 w-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-8 w-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                )}
            </div>
        </button>
    );
}
