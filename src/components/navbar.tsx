'use client'

import { useEffect, useState } from "react";
import Dropdown from "@/components/dropdown"
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { openBoardModal, setBoard } from "@/state/features/featureSlice";
import { useLocalStorage } from "@/utils/use-local-storage";
import { data } from "@/utils/data";

export default function Navbar() {
    const [localData, setLocalData] = useLocalStorage('boards', data);
    const [show, setShow] = useState(false);
    const currentBoard = useAppSelector((state) => state.feature.currentBoard);
    const dispatch = useAppDispatch();

    // Effect hook to run when the data updates
    // useEffect(() => {
    //     if (data) {
    //         // When a user signs in, set the currentBoardName to the first board's name
    //         const activeBoard = data.boards[0];
    //         dispatch(setBoardName(activeBoard.name));
    //     }
    // }, [dispatch]);

    const saveBoardState = () => {
        const newData = JSON.parse(JSON.stringify(data));
        const boardIndex = data.boards.findIndex(board => board.id === currentBoard.id);
        if (boardIndex !== -1) {
            newData.boards[boardIndex] = currentBoard;
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
                    {currentBoard.name}
                </p>

                <div className="flex items-center space-x-3">
                    <button onClick={saveBoardState} type="button" className="bg-blue-500 text-black px-4 py-2 flex rounded-3xl items-center space-x-2">
                        <p>Save Board</p>
                    </button>
                    <button onClick={() => dispatch(openBoardModal("Add New Task"))} type="button" className="bg-blue-500 text-black px-4 py-2 flex rounded-3xl items-center space-x-2">
                        <p>+ Add New Task</p>
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