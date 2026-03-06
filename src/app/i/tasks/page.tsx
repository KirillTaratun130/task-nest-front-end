import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constans/seo.constans";
import Heading from "@/components/ui/Heading";
import TasksView from "@/app/i/tasks/TasksView";

export const metadata: Metadata = {
    title: 'Tasks',
    ...NO_INDEX_PAGE
}

const TasksPage = () => {
    return (
        <div className='px-[20px]'>
            <Heading title='Задачи' />
            <TasksView />
        </div>
    );
};

export default TasksPage;