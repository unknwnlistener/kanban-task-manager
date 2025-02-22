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

const initialState = {
    activeBoardId: "",
    boards: [] as Board[],
    boardModal: { isOpen: false, variant: "" }
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
        addNewColumn: (state, action: PayloadAction<string>) => {
            const currentBoardIndex = state.boards.findIndex((board) => board.id === state.activeBoardId);
            const newColumn = getNewColumn(action.payload);
            if (currentBoardIndex !== -1) {
                state.boards[currentBoardIndex].columns.push(newColumn);
            }
        },
        addNewTask: (state, action: PayloadAction<{ task: Omit<Task, "id" | "status">, columnId: string }>) => {
            const currentBoardIndex = state.boards.findIndex((board) => board.id === state.activeBoardId);
            const currentColumnIndex = state.boards[currentBoardIndex].columns.findIndex((column) => column.id === action.payload.columnId);
            state.boards[currentBoardIndex].columns[currentColumnIndex].tasks.push(getNewTask(action.payload.task.title, action.payload.task.description));
        },
        editColumnName: (state, action: PayloadAction<{ name: string, columnId: string }>) => {
            const currentBoardIndex = state.boards.findIndex((board) => board.id === state.activeBoardId);
            const currentColumnIndex = state.boards[currentBoardIndex].columns.findIndex((column) => column.id === action.payload.columnId);
            state.boards[currentBoardIndex].columns[currentColumnIndex].name = action.payload.name;
        },
        openBoardModal: (state, action: PayloadAction<string>) => {
            state.boardModal.isOpen = true;
            state.boardModal.variant = action.payload
        },
        closeBoardModal: (state) => {
            state.boardModal.isOpen = false;
            state.boardModal.variant = ""
        }
    }
})

export const { setActiveBoardId, createNewBoard, addNewColumn, addNewTask, editColumnName, openBoardModal, closeBoardModal } = featureSlice.actions;

export default featureSlice.reducer;