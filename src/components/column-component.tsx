import { removeColumn, type Column } from "@/state/features/featureSlice";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import AddNewTaskForm from "./add-new-task-form";
import EditColumnForm from "./edit-column-form";
import { Droppable } from "@hello-pangea/dnd";
import TaskComponent from "./task-component";
import clsx from "clsx";
import { useAppDispatch } from "@/state/hooks";

export default function ColumnComponent({ column }: { column: Column }) {
    const dispatch = useAppDispatch();
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showNameEdit, setShowNameEdit] = useState(false);
    const { id: columnId, name, tasks } = column;
    return (
        <div key={columnId} className="w-[17.5rem] shrink-0 text-black">
            {showNameEdit ?
                <EditColumnForm columnName={name} columnId={columnId} onClose={() => setShowNameEdit(false)} />
                :
                <div className="flex gap-1 text-white">
                    <p>{`${name} (${tasks ? tasks?.length : 0
                        })`}</p>
                    <button type="button" onClick={() => setShowNameEdit(true)}>
                        <Edit />
                    </button>
                    <button type="button" onClick={() => dispatch(removeColumn({ columnId }))}>
                        <Trash2 />
                    </button>

                </div>
            }

            <Droppable droppableId={columnId}>
                {(provided) => (tasks &&
                    <div
                        className={clsx("bg-slate-100", "mt-6 transition-colors duration-300 h-full rounded-md flex flex-col items-start justify-between p-4 text-black")}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <div className="space-y-2 w-full">
                            {((tasks.length > 0) && (
                                tasks.map((task, index) => <TaskComponent key={task.id} task={task} index={index} />)
                            ))}
                            {provided.placeholder}
                        </div>
                        {showTaskForm &&
                            <AddNewTaskForm columnId={columnId} onClose={() => setShowTaskForm(false)} />
                        }
                        <button type="button" onClick={() => setShowTaskForm(true)} className="text-gray-700">Add new task</button>
                    </div>
                )}
            </Droppable>
        </div>
    )
}