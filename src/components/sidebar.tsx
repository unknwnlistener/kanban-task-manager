'use client'

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setActiveBoardId } from "@/state/features/featureSlice";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateNewBoardForm from "./create-new-board-form";
import BoardDropdown from "./board-dropdown";

export default function Sidebar() {
    const [createActive, setCreateActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const activeBoardId = useAppSelector((state) => state.feature.activeBoardId)
    const boards = useAppSelector((state) => state.feature.boards);

    const handleNav = (id: string) => {
        if (id === activeBoardId)
            return;
        dispatch(setActiveBoardId(id));
    };

    return (
        <aside className="w-[18.75rem] flex-none dark:bg-dark-grey h-full py-6 pr-6">
            {boards &&
                (
                    <>
                        <p className="text-medium-grey pl-[2.12rem] text-[.95rem] font-semibold uppercase pb-3">
                            {`All Boards (${boards.length})`}
                        </p>
                        {boards.map(({ name, id }) => (
                            <div key={id} className="flex items-center space-x-2 justify-start">
                                <button
                                    type="button"
                                    onClick={() => handleNav(id)}
                                    className={clsx((id === activeBoardId ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'), 'rounded-tr-full rounded-br-full cursor-pointer text-left pl-[2.12rem] py-3 pb-3 w-full ')}
                                >
                                    <p className="text-lg capitalize">{name}</p>
                                </button>
                                <BoardDropdown boardId={id} />
                            </div>
                        ))}
                    </>
                )
            }
            {createActive ?
                <CreateNewBoardForm onClose={() => setCreateActive(false)} /> :
                <button onClick={() => setCreateActive(true)} type="button" className="flex rounded-tr-full rounded-br-full items-center space-x-2 pl-[2.12rem] py-3 hover:bg-gray-200 w-full">
                    <Plus />
                    <p className="text-base font-bold capitalize">
                        Create New Board
                    </p>
                </button>
            }
        </aside>
    );
}