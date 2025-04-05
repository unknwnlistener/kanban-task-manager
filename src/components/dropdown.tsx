import { openBoardModal } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks"
import clsx from "clsx"

interface Dropdown {
    show: boolean
}

export default function Dropdown({ boardId }: { boardId: string }) {
    const dispatch = useAppDispatch();

    return (
        <ul
            className={clsx("z-10 w-48 absolute top-full bg-white border shadow-lg right-0 rounded-lg overflow-clip")}
        >
            <li className="hover:bg-gray-100">
                <button onClick={() => dispatch(openBoardModal({ variant: "editBoard", boardId: boardId }))} type="button" className="text-sm text-left p-4 w-full">Edit Board</button>
            </li>
            <li className="hover:bg-gray-100">
                <button onClick={() => dispatch(openBoardModal({ variant: "removeBoard", boardId: boardId }))} type="button" className="text-sm text-left p-4 w-full">
                    Remove Board
                </button>
            </li>
        </ul>
    )
}