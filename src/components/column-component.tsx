import type { Column } from "@/state/features/featureSlice";
import { Edit } from "lucide-react";

export default function ColumnComponent({ column }: { column: Column }) {
    const { id, name, tasks } = column;
    return (
        <>
            <div key={id} className="w-[17.5rem] shrink-0">
                <div className="flex">
                    <p className="text-black">{`${name} (${tasks ? tasks?.length : 0
                        })`}</p>
                    <button type="button">
                        <Edit />
                    </button>
                </div>

                {tasks &&
                    // Display the tasks if there are tasks in the column, if not, display an empty column
                    (tasks.length > 0 ? (
                        tasks.map((task) => {
                            const { id, title } = task;

                            return (
                                <div
                                    key={id}
                                    className="bg-white p-6 rounded-md mt-6 flex items-center justify-between border"
                                >
                                    <p>{title}</p>
                                    <div className="flex items-center space-x-1">
                                        {/* <MdEdit className="text-lg cursor-pointer" />
                                                        <MdDelete className="text-lg cursor-pointer text-red-500" /> */}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="mt-6 h-full rounded-md border-dashed border-4 border-white" />
                    ))}
            </div>
        </>
    )
}