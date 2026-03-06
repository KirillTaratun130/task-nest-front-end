import {useQuery} from "@tanstack/react-query";
import {userService} from "@/services/user.service";
import {taskService} from "@/services/task.service";
import {useEffect, useState} from "react";
import {ITaskResponse} from "@/types/task.types";

export const useTasks = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => taskService.getTasks()
    })

    return { data, isLoading }
}