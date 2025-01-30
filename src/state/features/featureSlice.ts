import { data } from "@/utils/data";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
    currentBoard: data.boards[0] as Board,
    boardModal: { isOpen: false, content: "" }
};

export const featureSlice = createSlice({
    name: "features",
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<Board>) => {
            state.currentBoard = action.payload;
        },
        openBoardModal: (state, action: PayloadAction<string>) => {
            state.boardModal.isOpen = true;
            state.boardModal.content = action.payload
        },
        closeBoardModal: (state) => {
            state.boardModal.isOpen = false;
            state.boardModal.content = ""
        }
    }
})

export const { setBoard, openBoardModal, closeBoardModal } = featureSlice.actions;

export default featureSlice.reducer;