import {Draggable, Droppable} from "@hello-pangea/dnd"
import ListRow from "@/app/i/tasks/list-view/ListRow"
import {FILTERS} from "@/app/i/tasks/columns.data"
import {filterTasks} from "@/app/i/tasks/filter-tasks"
import ListAddRowInput from "@/app/i/tasks/list-view/ListAddRowInput"
import {useTaskStore} from "@/stores/task.store"

interface IListRowParentProps {
    id: string
    label: string
}

const ListRowParent = ({ id, label }: IListRowParentProps) => {
    const { items } = useTaskStore()

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
                                        <ListRow key={item.id} item={item} />
                                </div>
                            )}
                        </Draggable>
                    ))}

                    {provided.placeholder}

                    {id !== 'completed' && !items?.some(item => !item.id) && (
                        <ListAddRowInput filterDate={FILTERS[id] ? FILTERS[id].format() : undefined} />
                    )}
                </div>
            )}
        </Droppable>
    )
}

export default ListRowParent