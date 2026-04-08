import {useQuery} from "@tanstack/react-query";
import {taskService} from "@/services/task.service";
import {useState} from "react";
import type {ITaskResponse} from "@/types/task.types";

export const useTasks = () => {
    const { data } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => taskService.getTasks()
    })

    const [ items, setItems ] = useState<ITaskResponse[] | undefined>(data?.data)

    if (data?.data && items !== data.data) {
        setItems(data.data)
    }

    return { items, setItems }
}