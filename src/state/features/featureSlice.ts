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

const getInitialState = () => {
    const localData = localStorage.getItem('boards');
    let boardData: { boards: Board[] };
    if (localData && localData !== "") {
        boardData = JSON.parse(localData);
    } else {
        boardData = data;
    }
    return {
        currentBoard: boardData.boards[1],
        boardModal: { isOpen: false, content: "" }
    }
};

export const featureSlice = createSlice({
    name: "features",
    initialState: getInitialState(),
    reducers: {
        setBoard: (state, action: PayloadAction<Board>) => {
            state.currentBoard = action.payload;
        },
        saveBoard: (state) => {
            const newData = JSON.parse(JSON.stringify(data));
            const boardIndex = data.boards.findIndex(board => board.id === state.currentBoard.id);
            if (boardIndex !== -1) {
                newData.boards[boardIndex] = state.currentBoard;
            }
            localStorage.setItem("boards", JSON.stringify(newData));
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

export const { setBoard, saveBoard, openBoardModal, closeBoardModal } = featureSlice.actions;

export default featureSlice.reducer;