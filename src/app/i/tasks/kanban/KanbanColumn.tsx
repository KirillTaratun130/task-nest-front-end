import type {ITaskResponse} from "@/types/task.types";
import type {Dispatch, SetStateAction} from "react";
import {Draggable, Droppable} from "@hello-pangea/dnd";
import KanbanCard from "@/app/i/tasks/kanban/KanbanCard";
import {FILTERS} from "@/app/i/tasks/columns.data";
import {filterTasks} from "@/app/i/tasks/filter-tasks";
import KanbanAddCardInput from "@/app/i/tasks/kanban/KanbanAddCardInput";

interface IKanbanRowParentProps {
    id: string
    label: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const KanbanColumn = ({ id, label, items, setItems }: IKanbanRowParentProps) => {
    return (
        <Droppable droppableId={id}>
            {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className='text-xl mt-2 pl-2 border-b-1 border-card-border pb-2'>
                        <div className='w-full'>{ label }</div>
                    </div>
                    {filterTasks(items, id)?.map((item, index) => (
                        <Draggable draggableId={item.id} index={index} key={item.id}>
                            {provided => (
                                <div ref={provided.innerRef}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                     className='relative'>
                                        <KanbanCard key={item.id} item={item} setItems={setItems} />
                                </div>
                            )}
                        </Draggable>
                    ))}

                    {provided.placeholder}

                    {id !== 'completed' && !items?.some(item => !item.id) && (
                        <KanbanAddCardInput setItems={setItems} filterDate={FILTERS[id] ? FILTERS[id].format() : undefined} />
                    )}
                </div>
            )}
        </Droppable>
    );
};

export default KanbanColumn;