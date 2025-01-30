'use client'

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useState } from "react";
import { data } from "@/utils/data";
import { type Board, openBoardModal, setBoard } from "@/state/features/featureSlice";
import clsx from "clsx";

export default function Sidebar() {
    const currentBoard = useAppSelector((state) => state.feature.currentBoard);
    const [active, setActive] = useState<string>(currentBoard.id);
    const dispatch = useAppDispatch();

    const handleNav = (id: string) => {
        if (id === active)
            return;
        setActive(id);
        const selectedBoard = data.boards.filter((board) => board.id === id)[0] as Board
        dispatch(setBoard(selectedBoard));
    };

    return (
        <aside className="w-[18.75rem] flex-none dark:bg-dark-grey h-full py-6 pr-6">
            {data &&
                (
                    <>
                        <p className="text-medium-grey pl-[2.12rem] text-[.95rem] font-semibold uppercase pb-3">
                            {`All Boards (${data.boards.length})`}
                        </p>
                        {data.boards.map(({ name, id }) => (
                            <button
                                type="button"
                                key={id}
                                onClick={() => handleNav(id)}
                                className={clsx((id === active ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'), 'rounded-tr-full rounded-br-full cursor-pointer flex  items-center space-x-2 pl-[2.12rem] py-3 pb-3 w-full ')}
                            >
                                <p className="text-lg capitalize">{name}</p>
                            </button>

                        ))}
                    </>
                )
            }
            <button onClick={() => dispatch(openBoardModal("Create New Board"))} type="button" className="flex items-center space-x-2 pl-[2.12rem] py-3">
                <p className="text-base font-bold capitalize">
                    + Create New Board
                </p>
            </button>
        </aside>
    );
}