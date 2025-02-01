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
    tasks?: Task[];
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
        },
        addNewColumn: (state, action: PayloadAction<{ name: string, boardId: string }>) => {
            const boardIndex = state.boards.findIndex((board) => board.id === action.payload.boardId);
            const newColumn = getNewColumn(action.payload.name);
            if (boardIndex !== -1) {
                state.boards[boardIndex].columns.push(newColumn);
            }
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

export const { setActiveBoardId, createNewBoard, addNewColumn, openBoardModal, closeBoardModal } = featureSlice.actions;

export default featureSlice.reducer;