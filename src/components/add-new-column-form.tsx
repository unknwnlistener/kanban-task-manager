import { addNewColumn } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks";
import { X } from "lucide-react";
import Form from "next/form";

export default function AddNewColumnForm({ onClose }: { onClose: () => void }) {
    const dispatch = useAppDispatch();
    const createColumn = (formData: FormData) => {
        const columnName = formData.get('columnName') as string;
        onClose();
        dispatch(addNewColumn(columnName));
    }
    return (
        <Form action={createColumn}>
            <div className="flex flex-col gap-1">
                <label htmlFor="columnName" className="sr-only">Column Name</label>
                <input type="text" name="columnName" />
                <div className="flex gap w-full">
                    <button type="submit" className="p-2 bg-blue-600 text-white rounded-full grow">+ Add</button>
                    <button type="button" onClick={() => onClose()}><X /></button>
                </div>
            </div>
        </Form>
    )
}