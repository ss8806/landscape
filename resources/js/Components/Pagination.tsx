import React, { useEffect, useRef } from "react";

interface Props {
    props: any;
    sum: number;
    per: number;
    onChange: (e: { page: number }) => void;
}

export default function Pagination({ sum, per, onChange }: Props) {
    // 初回レンダリングかどうかを判定するための変数
    const isFirstRender = React.useRef(true);
    // 現在のページ番号
    const [currentPage, setPage] = React.useState(1);

    React.useEffect(() => {
        // 初回レンダリング時はスキップし、変数を更新する
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // 親コンポーネントにpage番号を渡す
        onChange({ page: currentPage });
    }, [currentPage]);

    // ページ数
    const totalPage: number = Math.ceil(sum / per);

    // 「<」がクリックされたときの処理
    const handleBack = (): void => {
        if (currentPage === 1) {
            return;
        }

        setPage(currentPage - 1);
    };

    // 「>」がクリックされたときの処理
    const handleForward = (): void => {
        if (currentPage === totalPage) {
            return;
        }

        setPage(currentPage + 1);
    };

    // ページ番号を直接クリックされたときの処理
    const handleMove = (page: number): void => {
        setPage(page);
    };

    return (
        <div>
            {/* ページ番号が0（= アイテムが0個）のときは何も描画しない */}
            {totalPage !== 0 && (
                <>
                    <span onClick={() => handleBack()}>＜</span>
                    <ul>
                        {[...Array(totalPage).keys()].map((page) => {
                            page++;
                            return page === currentPage ? (
                                <li key={page} onClick={() => handleMove(page)}>
                                    {page} active
                                </li>
                            ) : (
                                <li key={page} onClick={() => handleMove(page)}>
                                    {page}
                                </li>
                            );
                        })}
                    </ul>
                    <span onClick={() => handleForward()}>＞</span>
                </>
            )}
        </div>
    );
}
