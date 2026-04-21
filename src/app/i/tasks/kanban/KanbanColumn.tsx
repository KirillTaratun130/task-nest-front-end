import {Draggable, Droppable} from "@hello-pangea/dnd"
import KanbanCard from "@/app/i/tasks/kanban/KanbanCard"
import {FILTERS} from "@/app/i/tasks/columns.data"
import {filterTasks} from "@/app/i/tasks/filter-tasks"
import KanbanAddCardInput from "@/app/i/tasks/kanban/KanbanAddCardInput"
import {useTaskStore} from "@/stores/task.store"

interface IKanbanColumnProps {
    id: string
    label: string
}

const KanbanColumn = ({ id, label }: IKanbanColumnProps) => {
    const { items } = useTaskStore()

    return (
        <Droppable droppableId={id}>
            {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className='text-text-heading text-xl mb-4'>
                        <div className=''>{ label }</div>
                    </div>
                    {filterTasks(items, id)?.map((item, index) => (
                        <Draggable draggableId={item.id} index={index} key={item.id}>
                            {provided => (
                                <div ref={provided.innerRef}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                     className='mb-4'>
                                        <KanbanCard key={item.id} item={item} />
                                </div>
                            )}
                        </Draggable>
                    ))}

                    {provided.placeholder}

                    {id !== 'completed' && !items?.some(item => !item.id) && (
                        <KanbanAddCardInput filterDate={FILTERS[id] ? FILTERS[id].format() : undefined} />
                    )}
                </div>
            )}
        </Droppable>
    )
}

export default KanbanColumn
