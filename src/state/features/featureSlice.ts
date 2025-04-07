'use client'

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { id } from "@/utils/data";

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
}

export interface Column {
    id: string;
    name: string;
    tasks: Task[];
}

export interface Board {
    id: string;
    name: string;
    columns: Column[]
}

const localData: Board[] = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("boards") ?? "[]")
    : [];

const initialState = {
    activeBoardId: "",
    boards: localData?.length === 0 ? [] as Board[] : localData,
    boardModal: { isOpen: false, variant: "", boardId: "" }
};

const getNewBoard = (name: string) => {
    return {
        id: id(),
        name: name,
        columns: [] as Column[]
    }
}
const getNewColumn = (name: string) => {
    return {
        id: id(),
        name: name,
        tasks: [] as Task[]
    }
}

const getNewTask = (title: string, description?: string) => {
    return {
        id: id(),
        title: title,
        description: description,
        status: "created"
    }
}

export const featureSlice = createSlice({
    name: "features",
    initialState,
    reducers: {
        setActiveBoardId: (state, action: PayloadAction<string>) => {
            state.activeBoardId = action.payload;
        },
        createNewBoard: (state, action: PayloadAction<string>) => {
            if (action.payload === "")
                return;
            const newBoard = getNewBoard(action.payload);
            state.boards.push(newBoard)
            state.activeBoardId = newBoard.id;
        },
        editBoardName: (state, action: PayloadAction<{ name: string, boardId: string }>) => {
            if (action.payload.name === "" || action.payload.boardId === "")
                return;
            const currentBoardIndex = state.boards.findIndex((board) => board.id === action.payload.boardId);
            state.boards[currentBoardIndex].name = action.payload.name;
        },
        addNewColumn: (state, action: PayloadAction<string>) => {
            if (action.payload === "")
                return;
            const currentBoardIndex = state.boards.findIndex((board) => board.id === state.activeBoardId);
            const newColumn = getNewColumn(action.payload);
            if (currentBoardIndex !== -1) {
                state.boards[currentBoardIndex].columns.push(newColumn);
            }
        },
        removeColumn: (state, action: PayloadAction<{ columnId: string }>) => {
            const { columnId } = action.payload;
            if (columnId === "")
                return;
            const currentBoardIndex = state.boards.findIndex((board) => board.id === state.activeBoardId);
            state.boards[currentBoardIndex].columns = state.boards[currentBoardIndex].columns.filter((column) => column.id !== columnId);
        },
        editColumnName: (state, action: PayloadAction<{ name: string, columnId: string }>) => {
            if (action.payload.name === "")
                return;
            const currentBoardIndex = state.boards.findIndex((board) => board.id === state.activeBoardId);
            const currentColumnIndex = state.boards[currentBoardIndex].columns.findIndex((column) => column.id === action.payload.columnId);
            state.boards[currentBoardIndex].columns[currentColumnIndex].name = action.payload.name;
        },
        addNewTask: (state, action: PayloadAction<{ task: Omit<Task, "id" | "status">, columnId: string }>) => {
            const currentBoardIndex = state.boards.findIndex((board) => board.id === state.activeBoardId);
            const currentColumnIndex = state.boards[currentBoardIndex].columns.findIndex((column) => column.id === action.payload.columnId);
            state.boards[currentBoardIndex].columns[currentColumnIndex].tasks.push(getNewTask(action.payload.task.title, action.payload.task.description));
        },
        removeTask: (state, action: PayloadAction<{ taskId: string }>) => {
            const { taskId } = action.payload;
            if (taskId === "")
                return;
            const currentBoardIndex = state.boards.findIndex((board) => board.id === state.activeBoardId);
            state.boards[currentBoardIndex].columns = state.boards[currentBoardIndex].columns.map((column) => {
                const newColumn = { ...column };
                newColumn.tasks = newColumn.tasks.filter((task) => task.id !== taskId)
                return newColumn;
            });
        },

        openBoardModal: (state, action: PayloadAction<{ variant: string, boardId: string }>) => {
            state.boardModal.variant = action.payload.variant
            state.boardModal.boardId = action.payload.boardId
            state.boardModal.isOpen = true;

        },
        closeBoardModal: (state) => {
            state.boardModal.variant = ""
            state.boardModal.boardId = ""
            state.boardModal.isOpen = false;
        },
        clearBoard: (state) => {
            const currentBoardIndex = state.boards.findIndex((board) => board.id === state.activeBoardId);
            state.boards[currentBoardIndex].columns = [];
        },
        removeBoard: (state, action: PayloadAction<string>) => {
            const currentBoardIndex = state.boards.findIndex((board) => board.id === action.payload);
            if (currentBoardIndex !== -1) {
                state.activeBoardId = "";
                state.boards.splice(currentBoardIndex, 1);
            }
        }
    }
})

export const {
    setActiveBoardId,
    createNewBoard,
    editBoardName,
    addNewColumn,
    removeColumn,
    addNewTask,
    removeTask,
    editColumnName,
    openBoardModal,
    closeBoardModal,
    clearBoard,
    removeBoard } = featureSlice.actions;

export default featureSlice.reducer;