import type { Column } from "@/state/features/featureSlice";
import { Edit } from "lucide-react";
import { useState } from "react";
import AddNewTaskForm from "./add-new-task-form";
import EditColumnForm from "./edit-column-form";

export default function ColumnComponent({ column }: { column: Column }) {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showNameEdit, setShowNameEdit] = useState(false);
    const { id, name, tasks } = column;
    return (
        <>
            <div key={id} className="w-[17.5rem] shrink-0">
                {showNameEdit ?
                    <EditColumnForm columnName={name} columnId={id} onClose={() => setShowNameEdit(false)} />
                    :
                    <div className="flex">
                        <p className="text-black">{`${name} (${tasks ? tasks?.length : 0
                            })`}</p>
                        <button type="button" onClick={() => setShowNameEdit(true)}>
                            <Edit />
                        </button>
                    </div>
                }

                {tasks &&
                    <div className="mt-6 h-full rounded-md bg-white flex flex-col items-start justify-between p-4">
                        <div className="space-y-2 w-full">
                            {((tasks.length > 0) && (
                                tasks.map((task) => {
                                    const { id, title } = task;
                                    return (
                                        <div
                                            key={id}
                                            className="bg-white w-full p-2 rounded-md flex items-center justify-between border"
                                        >
                                            <p>{title}</p>
                                            <div className="flex items-center space-x-1">
                                                {/* <MdEdit className="text-lg cursor-pointer" />
                                                            <MdDelete className="text-lg cursor-pointer text-red-500" /> */}
                                            </div>
                                        </div>
                                    );
                                })
                            ))}
                        </div>
                        {showTaskForm &&
                            <AddNewTaskForm columnId={column.id} onClose={() => setShowTaskForm(false)} />
                        }
                        <button type="button" onClick={() => setShowTaskForm(true)} className="">Add new task</button>
                    </div>
                }
            </div>
        </>
    )
}