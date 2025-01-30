'use client';

import { type Column, openBoardModal } from "@/state/features/featureSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";

export default function BoardTasks() {
    const [columns, setColumns] = useState<Column[]>([]);
    const activeBoard = useAppSelector((state) => state.feature.currentBoard);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (activeBoard) {
            const columns = activeBoard.columns as Column[];
            setColumns(columns);
        }
    }, [activeBoard]);


    return (
        <div className="overflow-x-auto overflow-y-auto w-full bg-stone-200">
            {columns.length > 0 ? (
                <div className="flex space-x-6">
                    {columns.map((column) => {
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
                    {columns.length < 7 ? (
                        <button onClick={() => dispatch(openBoardModal("Create New Column"))} type="button" className="rounded-md bg-white w-[17.5rem] mt-12 shrink-0 flex justify-center items-center">
                            <p className="cursor-pointer font-bold text-black text-2xl">
                                + New Column
                            </p>
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <p className="text-black text-sm">
                            This board is empty. Create a new column to get started.
                        </p>
                        <button type="button" className="bg-blue-500 text-black px-4 py-2 flex mt-6 rounded-3xl items-center space-x-2">
                            <p>+ Add New Column</p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}