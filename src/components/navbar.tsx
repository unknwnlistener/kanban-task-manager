'use client'

import { useState } from "react";
import Dropdown from "@/components/dropdown"
import { useAppSelector } from "@/state/hooks";
import { useLocalStorage } from "@/utils/use-local-storage";

export default function Navbar() {
    const boards = useAppSelector((state) => state.feature.boards);
    const [localData, setLocalData] = useLocalStorage('boards', boards);
    const [show, setShow] = useState(false);
    const activeBoardId = useAppSelector((state) => state.feature.activeBoardId);
    const currentBoard = localData.find((board) => board.id === activeBoardId);

    const saveBoardState = () => {
        const newData = JSON.parse(JSON.stringify(localData));
        const boardIndex = localData.findIndex(board => board.id === activeBoardId);
        if (boardIndex !== -1) {
            newData[boardIndex] = currentBoard;
        }
        setLocalData(newData);
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
                    <button onClick={saveBoardState} type="button" className="bg-blue-500 text-black px-4 py-2 flex rounded-3xl items-center space-x-2">
                        <p>Save Board</p>
                    </button>
                    <div className="relative flex items-center">
                        <button type="button" className="text-3xl mb-4" onClick={() => setShow(show => !show)}>...</button>
                        <Dropdown show={show} />
                    </div>
                </div>
            </div>
        </nav>
    )
}