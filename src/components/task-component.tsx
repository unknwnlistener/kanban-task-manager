import { removeTask, type Task } from "@/state/features/featureSlice";
import { useAppDispatch } from "@/state/hooks";
import { Draggable } from "@hello-pangea/dnd";
import clsx from "clsx";
import { Delete } from "lucide-react";

export default function TaskComponent({ task, index }: { task: Task, index: number }) {
    const dispatch = useAppDispatch();
    const { id: taskId, title } = task;
    return (
        <Draggable draggableId={taskId} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    key={taskId}
                    className={clsx(snapshot.isDragging ? "bg-blue-100 border border-black" : "bg-white", "w-full p-2 rounded-md flex items-center justify-between border", "transition")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <p>{title}</p>
                    <div className="flex items-center space-x-1">
                        {/* <MdEdit className="text-lg cursor-pointer" /> */}
                        <button type="button" className="text-lg cursor-pointer text-red-500" onClick={() => dispatch(removeTask({ taskId: taskId }))}><Delete /></button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}