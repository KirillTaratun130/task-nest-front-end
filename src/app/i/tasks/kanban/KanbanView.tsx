'use client'

import {useTasks} from "@/app/i/tasks/hooks/useTasks"
import {useTaskDnd} from "@/app/i/tasks/hooks/useTaskDnd"
import {DragDropContext} from "@hello-pangea/dnd"
import {COLUMNS} from "@/app/i/tasks/columns.data"
import KanbanColumn from "@/app/i/tasks/kanban/KanbanColumn"

const KanbanView = () => {
    useTasks()
    const { onDragEnd } = useTaskDnd()

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='overflow-x-auto whitespace-nowrap'>
                <div className='flex gap-10 min-w-[270px] w-[270px]'>
                    { COLUMNS.map(column => (
                        <KanbanColumn id={column.id} label={column.label} key={column.id} />
                    )) }
                </div>
            </div>
        </DragDropContext>
    )
}

export default KanbanView
