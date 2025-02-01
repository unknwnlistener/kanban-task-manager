import { createNewBoard } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks";
import { Save, X } from "lucide-react";
import Form from "next/form";

export default function CreateNewBoardForm({ onClose }: { onClose: () => void }) {
    const dispatch = useAppDispatch();

    const addBoard = (formData: FormData) => {
        const boardName = formData.get('boardName') as string;
        onClose();
        dispatch(createNewBoard(boardName));
    }
    return (
        <Form action={addBoard} className="flex gap-2 items-center">
            <label htmlFor="boardName" className="sr-only">Enter board name</label>
            {/* biome-ignore lint/a11y/noAutofocus: Input only shows when user clicks a button to create */}
            <input autoFocus type="text" name="boardName" required />
            <button className="" type="submit"><Save /></button>
            <button type="button" onClick={() => onClose()}><X /></button>
        </Form>
    )
}