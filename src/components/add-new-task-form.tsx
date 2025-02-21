import { addNewTask } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks";
import { X } from "lucide-react";
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === "Escape") {
            onClose();
        }
    };
    return (
        <Form onKeyDown={handleKeyDown} action={addBoard} className="flex flex-col gap-2">
            <label htmlFor="taskName" aria-required className="sr-only">Task title</label>
            <input type="text" name="taskName" required />
            <div className="flex gap-1">
                <button className="flex gap-2 p-1 border border-black rounded" type="submit">Add</button>
                <button onClick={() => onClose()} type="button"><X /></button>
            </div>
        </Form>
    )
}