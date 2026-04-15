'use client'

import {useLocalStorage} from "@/hooks/useLocalStorage";

export type TypeView = 'list' | 'kanban'

import ListView from "@/app/i/tasks/list-view/ListView";
import Loader from "@/components/ui/Loader";
import SwitcherView from "@/app/i/tasks/SwitcherView";
import KanbanView from "@/app/i/tasks/kanban/KanbanView";

const TasksView = () => {
    const [ value, setValue, isLoading ] = useLocalStorage<TypeView>('view-type', 'list')

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <SwitcherView type={value} setType={setValue} />
            { value ==='list' ? <ListView /> : <KanbanView /> }
        </div>
    )
};

export default TasksView;