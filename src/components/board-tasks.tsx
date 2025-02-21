'use client';

import type { Board } from "@/state/features/featureSlice";
import { useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import ColumnComponent from "./column-component";
import AddNewColumnForm from "./add-new-column-form";

export default function BoardTasks() {
    const [currentBoard, setCurrentBoard] = useState<Board>();
    const [showNewColumn, setShowNewColumn] = useState(false);
    const activeBoardId = useAppSelector((state) => state.feature.activeBoardId);
    const boards = useAppSelector((state) => state.feature.boards);

    useEffect(() => {
        if (activeBoardId) {
            const foundBoard = boards.find((board) => board.id === activeBoardId);
            if (foundBoard) setCurrentBoard(foundBoard);
        }
    }, [activeBoardId, boards]);


    return (
        <div className="overflow-x-auto overflow-y-auto w-full bg-stone-200">
            {!currentBoard ?
                (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <p className="text-black text-sm">
                                No board found. Create a new board in the sidebar.
                            </p>
                        </div>
                    </div>
                )
                :
                <div className="flex space-x-6">
                    {currentBoard.columns && currentBoard.columns.length > 0 && (
                        currentBoard.columns.map((column) => <ColumnComponent key={column.id + column.name} column={column} />)
                    )}
                    {showNewColumn && (
                        <div className="w-[17.5rem] shrink-0 mt-12">
                            <AddNewColumnForm onClose={() => setShowNewColumn(false)} />
                        </div>
                    )}
                    {currentBoard.columns && currentBoard.columns.length < 7 && !showNewColumn && (
                        <div className="w-[17.5rem] shrink-0">
                            <button onClick={() => setShowNewColumn(true)} type="button" className="rounded-md bg-white w-full mt-12 h-full">
                                <p className="cursor-pointer font-bold text-black text-lg">
                                    + Add New Column
                                </p>
                            </button>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}