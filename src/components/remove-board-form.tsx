import { removeBoard } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks";
import Form from "next/form";

export default function RemoveBoardForm({ onClose, boardId }: { onClose: () => void, boardId: string }) {
    const dispatch = useAppDispatch();

    const removeBoardAction = () => {
        onClose();
        dispatch(removeBoard(boardId));
    }
    return (
        <Form action={removeBoardAction} className="flex flex-col gap-2 items-center">
            <h2 className="text-lg mb-2">Are you sure you want to remove the current board?</h2>
            <div className="flex gap-2 self-end">
                <button className="bg-blue-200 border border-black p-2 rounded" type="submit">Yes</button>
                <button type="button" onClick={() => onClose()}>No</button>
            </div>
        </Form>
    )
}