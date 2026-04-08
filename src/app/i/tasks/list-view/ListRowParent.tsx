import type {ITaskResponse} from "@/types/task.types";
import type {Dispatch, SetStateAction} from "react";
import {Draggable, Droppable} from "@hello-pangea/dnd";
import ListRow from "@/app/i/tasks/list-view/ListRow";
import {FILTERS} from "@/app/i/tasks/columns.data";
import {filterTasks} from "@/app/i/tasks/filter-tasks";
import ListAddRowInput from "@/app/i/tasks/list-view/ListAddRowInput";

interface IListRowParentProps {
    id: string
    label: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const ListRowParent = ({ id, label, items, setItems }: IListRowParentProps) => {
    return (
        <Droppable droppableId={id}>
            {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className=''>
                        <div className='w-full'>{ label }</div>
                    </div>
                    {filterTasks(items, id)?.map((item, index) => (
                        <Draggable draggableId={item.id} index={index} key={item.id}>
                            {provided => (
                                <div ref={provided.innerRef}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                     className='relative'>
                                        <ListRow key={item.id} item={item} setItems={setItems} />
                                </div>
                            )}
                        </Draggable>
                    ))}

                    {provided.placeholder}

                    {id !== 'completed' && !items?.some(item => !item.id) && (
                        <ListAddRowInput setItems={setItems} filterDate={FILTERS[id] ? FILTERS[id].format() : undefined} />
                    )}
                </div>
            )}
        </Droppable>
    );
};

export default ListRowParent;