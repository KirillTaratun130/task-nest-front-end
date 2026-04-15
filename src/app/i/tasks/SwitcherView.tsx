import cn from "clsx";
import {TypeView} from "@/app/i/tasks/TasksView";
import {Kanban, ListTodo} from "lucide-react";

interface ISwitcherViewProps {
    type: TypeView
    setType: (value: TypeView) => void
}

const SwitcherView = ({ type, setType }: ISwitcherViewProps) => {
    return (
        <div className='flex items-center gap-4 mb-5 mt-5'>

            <button className={cn('flex items-center gap-1 text-text-heading cursor-pointer transition', {
                'opacity-40': type === 'kanban'
            })} onClick={() => setType('list')}>
                <ListTodo />
                Список
            </button>

            <button className={cn('flex items-center gap-1 text-text-heading cursor-pointer transition', {
                'opacity-40': type === 'list'
            })} onClick={() => setType('kanban')}>
                <Kanban />
                Доска
            </button>

        </div>
    );
};

export default SwitcherView;