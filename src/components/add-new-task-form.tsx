import { addNewTask } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks";
import Form from "next/form";

export default function AddNewTaskForm({ columnId, onClose }: { columnId: string, onClose: () => void }) {
    const dispatch = useAppDispatch();

    const addBoard = (formData: FormData) => {
        const taskName = formData.get('taskName') as string;
        onClose();
        dispatch(addNewTask({
            task: {
                title: taskName
            },
            columnId: columnId
        }));
    }
    return (
        <Form action={addBoard} className="flex flex-col gap-2">
            <label htmlFor="taskName" aria-required className="sr-only">Task title</label>
            <input type="text" name="taskName" required />
            <div>
                <button className="flex gap-2 p-2 border border-black rounded" type="submit">Add</button>
            </div>
        </Form>
    )
}