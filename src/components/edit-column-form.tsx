import { editColumnName } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks";
import { Save, X } from "lucide-react";
import Form from "next/form";

export default function EditColumnForm({ columnName, columnId, onClose }: { columnName: string, columnId: string, onClose: () => void }) {
    const dispatch = useAppDispatch();
    const createColumn = (formData: FormData) => {
        const columnName = formData.get('columnName') as string;
        onClose();
        dispatch(editColumnName({ name: columnName, columnId: columnId }));
    }
    return (
        <Form action={createColumn}>
            <div className="flex gap-1">
                <label htmlFor="columnName" className="sr-only">Column Name</label>
                <input type="text" name="columnName" defaultValue={columnName} />
                <div className="flex gap w-full">
                    <button type="submit" className="p-2 text-blue-600 rounded-full"><Save /></button>
                    <button type="button" onClick={() => onClose()}><X /></button>
                </div>
            </div>
        </Form>
    )
}