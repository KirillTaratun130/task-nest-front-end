import {useQuery} from "@tanstack/react-query";
import {taskService} from "@/services/task.service";

export const useTasks = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => taskService.getTasks()
    })

    return { data, isLoading }
}