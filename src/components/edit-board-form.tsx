import { editBoardName } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks";
import { Save, X } from "lucide-react";
import Form from "next/form";

export default function EditBoardForm({ boardId, onClose }: { boardId: string, onClose: () => void }) {
    const dispatch = useAppDispatch();

    const editBoard = (formData: FormData) => {
        const boardName = formData.get('boardName') as string;
        onClose();

        dispatch(editBoardName({ name: boardName, boardId: boardId }))
    }
    return (
        <Form action={editBoard}>
            <h2>Edit Board</h2>
            <input type="text" name="boardName" />
            <div className="flex gap w-full">
                <button type="submit" className="p-2 text-blue-600 rounded-full"><Save /></button>
                <button type="button" onClick={() => onClose()}><X /></button>
            </div>
        </Form>
    )
}