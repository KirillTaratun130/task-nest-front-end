import {useQuery} from "@tanstack/react-query";
import {taskService} from "@/services/task.service";
import {useState} from "react";
import {useEffect} from "react";
import type {ITaskResponse} from "@/types/task.types";

export const useTasks = () => {
    const { data } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => taskService.getTasks()
    })

    const [ items, setItems ] = useState<ITaskResponse[] | undefined>(data?.data)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (data?.data) setItems(data.data)
    }, [data?.data])


    return { items, setItems }
}