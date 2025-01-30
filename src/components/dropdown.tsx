import { openBoardModal } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks"
import clsx from "clsx"

interface Dropdown {
    show: boolean
}

export default function Dropdown({ show }: Dropdown) {
    const dispatch = useAppDispatch();

    return (
        <div
            className={clsx(show ? "block" : "hidden", "w-48 absolute top-full bg-white border shadow-lg right-0 py-2 rounded-2xl")}
        >
            <div className="hover:bg-gray-300">
                <button onClick={() => dispatch(openBoardModal("Edit Board"))} type="button" className="text-sm px-4 py-2">Edit Board</button>
            </div>
            <div className="hover:bg-gray-300">
                <button onClick={() => dispatch(openBoardModal("Delete Board"))} type="button" className="text-sm px-4 py-2">
                    Delete Board
                </button>
            </div>
        </div>
    )
}