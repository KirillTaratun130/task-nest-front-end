'use client'

import {useTasks} from "@/app/i/tasks/hooks/useTasks"
import {useTaskDnd} from "@/app/i/tasks/hooks/useTaskDnd"
import {DragDropContext} from "@hello-pangea/dnd"
import {COLUMNS} from "@/app/i/tasks/columns.data"
import ListRowParent from "@/app/i/tasks/list-view/ListRowParent"

const ListView = () => {
    useTasks()
    const { onDragEnd } = useTaskDnd()

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='text-text-heading mt-4'>
                <div className='grid grid-cols-[600px_1fr_1fr_40px]'>
                    <div className='border-1 border-card-border border-l-0 p-2'>Название задачи</div>
                    <div className='border-1 border-card-border p-2'>Дата выполнения</div>
                    <div className='border-1 border-card-border p-2'>Приоритет</div>
                    <div className='border-1 border-card-border border-r-0 p-2'></div>
                </div>
                <div>
                    { COLUMNS.map(column => (
                        <ListRowParent id={column.id} label={column.label} key={column.id} />
                    )) }
                </div>
            </div>
        </DragDropContext>
    )
}

export default ListView
