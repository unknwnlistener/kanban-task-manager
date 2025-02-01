import { addNewColumn } from "@/state/features/featureSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

export default function AddNewColumnForm({ onClose }: { onClose: () => void }) {
    const activeBoardId = useAppSelector((state) => state.feature.activeBoardId);
    const dispatch = useAppDispatch();
    const createColumn = (formData: FormData) => {
        const columnName = formData.get('columnName') as string;
        onClose();
        dispatch(addNewColumn({ name: columnName, boardId: activeBoardId }));
    }
    return (
        <form action={createColumn}>
            <h2 className="font-bold text-lg mb-4">Add New Column</h2>
            <div className="flex flex-col gap-1">
                <label htmlFor="columnName">Column Name</label>
                <input type="text" name="columnName" />
                <button type="submit" className="p-2 bg-blue-600 text-white rounded-full">+ Add</button>
            </div>
        </form>
    )
}