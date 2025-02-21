import type { Task } from "@/state/features/featureSlice";
import { Draggable } from "@hello-pangea/dnd";
import clsx from "clsx";

export default function TaskComponent({ task, index }: { task: Task, index: number }) {
    const { id, title } = task;
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    key={id}
                    className={clsx(snapshot.isDragging ? "bg-blue-100" : "bg-white", "w-full p-2 rounded-md flex items-center justify-between border")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <p>{title}</p>
                    <div className="flex items-center space-x-1">
                        {/* <MdEdit className="text-lg cursor-pointer" />
                    <MdDelete className="text-lg cursor-pointer text-red-500" /> */}
                    </div>
                </div>
            )}
        </Draggable>
    );
}