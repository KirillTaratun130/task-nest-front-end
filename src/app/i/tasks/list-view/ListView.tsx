'use client'

import {useTasks} from "@/app/i/tasks/hooks/useTasks";
import {useTaskDnd} from "@/app/i/tasks/hooks/useTaskDnd";
import {DragDropContext} from "@hello-pangea/dnd";
import {COLUMNS} from "@/app/i/tasks/columns.data";
import ListRowParent from "@/app/i/tasks/list-view/ListRowParent";

const ListView = () => {
    const { items, setItems } = useTasks()
    const { onDragEnd } = useTaskDnd()

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className=''>
                <div className=''>
                    <div>Название задачи</div>
                    <div>Дата выполнения</div>
                    <div>Приоритет</div>
                    <div></div>
                </div>
                <div className=''>
                    { COLUMNS.map(column => (
                        <ListRowParent id={column.id} label={column.label} items={items} setItems={setItems} key={column.id} />
                    )) }
                </div>
            </div>
        </DragDropContext>
    );
};

export default ListView;