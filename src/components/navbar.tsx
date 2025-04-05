'use client'

// import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useLocalStorage } from "@/utils/use-local-storage";
import { openBoardModal } from "@/state/features/featureSlice";

export default function Navbar() {
    const activeBoardId = useAppSelector((state) => state.feature.activeBoardId);
    const boards = useAppSelector((state) => state.feature.boards);
    const [, setLocalData] = useLocalStorage('boards', boards);
    const currentBoard = boards.find((board) => board.id === activeBoardId);

    const dispatch = useAppDispatch();

    const saveBoardState = () => {
        alert("Board state saved to local storage");
        setLocalData(boards);
    }

    return (
        <nav className="bg-white border flex h-24">
            <div className="flex-none w-[18.75rem] border-r-2 flex items-center pl-[2.12rem]">
                <p className="font-bold text-3xl">Local Kanban</p>
            </div>

            <div className="flex justify-between w-full items-center pr-[2.12rem]">
                <p className="text-black text-2xl font-bold pl-6">
                    {currentBoard?.name}
                </p>

                <div className="flex items-center space-x-3">
                    <button onClick={() => saveBoardState()} type="button" className="bg-blue-500 text-white px-4 py-2 flex rounded-3xl items-center space-x-2">
                        <p>Save Board</p>
                    </button>
                    <button onClick={() => dispatch(openBoardModal({ variant: 'clearBoard', boardId: activeBoardId }))} type="button" className="bg-blue-500 text-white px-4 py-2 flex rounded-3xl items-center space-x-2">
                        <p>Clear Board</p>
                    </button>
                    {/* <button onClick={() => dispatch(openBoardModal('removeBoard'))} type="button" className="bg-blue-500 text-white px-4 py-2 flex rounded-3xl items-center space-x-2">
                        <p>Remove Board</p>
                    </button> */}
                </div>
            </div>
        </nav>
    )
}