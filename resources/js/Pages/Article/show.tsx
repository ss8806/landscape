import React, { SyntheticEvent, useEffect } from "react";
import Auth from "@/Layouts/Auth";
import LikeButton from "@/Components/LikeButton";
import SuccessMessage from "@/Components/SuccessMessage";

type Props = {
    auth: any;
    article: any;
    success: any;
};

export default function showArticle({ auth, success, article }: Props) {
    const {
        title,
        body,
        pic1,
        user_id,
        category_id,
        initial_is_liked,
        endpoint,
    } = article;

    useEffect(() => {
        console.log(success);
        // setTimeout(() => {
        //     handleClose();
        // }, 3000);
    }, [success]);
    return (
        <Auth auth={auth}>
            <section className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
                {success && <SuccessMessage success={success} />}

                <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
                    <h1 className="text-4xl font-bold from-current mb-8">
                        <p className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6">
                            {pic1}
                        </p>
                        <p>タイトル：{title}</p>
                        <p>カテゴリー:{category_id[0].name}</p>
                        <p>投稿者:{user_id[0].name}</p>
                        <p>{body}</p>
                        {auth.user ? (
                            <LikeButton
                                article={article}
                                auth={auth}
                                initial_is_liked={initial_is_liked}
                                endpoint={endpoint}
                            />
                        ) : (
                            ""
                        )}
                    </h1>
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0"></div>
                </div>
            </section>
        </Auth>
    );
}
