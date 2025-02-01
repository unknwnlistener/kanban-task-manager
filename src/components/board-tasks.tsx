'use client';

import { type Board, type Column, openBoardModal } from "@/state/features/featureSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";

export default function BoardTasks() {
    const [currentBoard, setCurrentBoard] = useState<Board>();
    const activeBoardId = useAppSelector((state) => state.feature.activeBoardId);
    const boards = useAppSelector((state) => state.feature.boards);
    const dispatch = useAppDispatch();

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
                currentBoard.columns && currentBoard.columns.length > 0 ? (
                    <div className="flex space-x-6">
                        {currentBoard.columns.map((column) => {
                            const { id, name, tasks } = column;
                            return (
                                <div key={id} className="w-[17.5rem] shrink-0">
                                    <p className="text-black">{`${name} (${tasks ? tasks?.length : 0
                                        })`}</p>

                                    {tasks &&
                                        // Display the tasks if there are tasks in the column, if not, display an empty column
                                        (tasks.length > 0 ? (
                                            tasks.map((task) => {
                                                const { id, title } = task;

                                                return (
                                                    <div
                                                        key={id}
                                                        className="bg-white p-6 rounded-md mt-6 flex items-center justify-between border"
                                                    >
                                                        <p>{title}</p>
                                                        <div className="flex items-center space-x-1">
                                                            {/* <MdEdit className="text-lg cursor-pointer" />
                                                        <MdDelete className="text-lg cursor-pointer text-red-500" /> */}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="mt-6 h-full rounded-md border-dashed border-4 border-white" />
                                        ))}
                                </div>
                            );
                        })}
                        {/* If the number of columns of tasks is less than 7, display an option to add more columns */}
                        {currentBoard.columns && currentBoard.columns.length < 7 && (
                            <div className="w-[17.5rem] shrink-0">
                                <button onClick={() => dispatch(openBoardModal("addNewColumn"))} type="button" className="rounded-md bg-white w-full mt-12 h-full">
                                    <p className="cursor-pointer font-bold text-black text-2xl">
                                        + New Column
                                    </p>
                                </button>
                            </div>
                        )}
                    </div>) :
                    (
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="flex flex-col items-center">
                                <p className="text-black text-sm">
                                    This board is empty. Create a new column to get started.
                                </p>
                                <button type="button" onClick={() => dispatch(openBoardModal('addNewColumn'))} className="bg-blue-500 text-black px-4 py-2 flex mt-6 rounded-3xl items-center space-x-2">
                                    <p>+ Add New Column</p>
                                </button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}