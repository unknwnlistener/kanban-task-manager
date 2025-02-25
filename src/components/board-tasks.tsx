'use client';

import type { Board } from "@/state/features/featureSlice";
import { useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import ColumnComponent from "./column-component";
import AddNewColumnForm from "./add-new-column-form";
import { DragDropContext, type OnDragEndResponder } from "@hello-pangea/dnd";

export default function BoardTasks() {
    const [currentBoard, setCurrentBoard] = useState<Board>();
    const [showNewColumn, setShowNewColumn] = useState(false);
    const activeBoardId = useAppSelector((state) => state.feature.activeBoardId);
    const boards = useAppSelector((state) => state.feature.boards);

    useEffect(() => {
        if (activeBoardId) {
            const foundIndex = boards.findIndex((board) => board.id === activeBoardId);
            if (foundIndex !== -1) setCurrentBoard(boards[foundIndex]);
        } else {
            setCurrentBoard(undefined);
        }
    }, [activeBoardId, boards]);

    const handleDragEnd: OnDragEndResponder = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        if (!currentBoard) {
            return;
        }
        const newColumns = currentBoard.columns.map((column) => ({
            ...column,
            tasks: [...column.tasks]
        }));

        const sourceIndex = newColumns.findIndex((column) => column.id === source.droppableId)
        const destinationIndex = newColumns.findIndex((column) => column.id === destination.droppableId)

        const itemMoved = newColumns[sourceIndex].tasks[source.index];

        newColumns[sourceIndex].tasks.splice(source.index, 1);

        newColumns[destinationIndex].tasks.splice(destination.index, 0, itemMoved);

        setCurrentBoard((board) => {
            if (board) {
                return { ...board, columns: newColumns }
            }
            return board;
        })
    }


    return (
        <div className="overflow-x-auto overflow-y-auto w-full bg-emerald-600 text-white p-5">
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
                    <DragDropContext onDragEnd={handleDragEnd}>
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
                    </DragDropContext>
                </div>
            }
        </div>
    )
}