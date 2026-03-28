import {useEffect, useMemo} from "react";
import {TypeTaskFormState} from "@/types/task.types";
import {useCreateTask} from "@/app/i/tasks/hooks/useCreateTask";
import {useUpdateTask} from "@/app/i/tasks/hooks/useUpdateTask";
import debounce from 'lodash.debounce'
import {UseFormWatch} from "react-hook-form";

interface IUseTaskDebounce {
    watch: UseFormWatch<TypeTaskFormState>
    itemId: string
}

export const useTaskDebounce = ({ watch, itemId }: IUseTaskDebounce) => {
    const { createTask } = useCreateTask()
    const { updateTask } = useUpdateTask()

    const debouncedCreateTask = useMemo(
        () => debounce((formData: TypeTaskFormState) => {
            createTask(formData)
        }, 444),
        [createTask]
    )

    const debouncedUpdateTask = useMemo(
        () => debounce((formData: TypeTaskFormState) => {
            updateTask({ id: itemId, data: formData })
        }, 444),
        [updateTask, itemId]
    )

    useEffect(() => {
        const { unsubscribe } = watch(formData => {
            if (itemId) {
                debouncedUpdateTask({
                    ...formData,
                    priority: formData.priority || undefined
                })
            } else {
                debouncedCreateTask(formData)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [watch, itemId, debouncedCreateTask, debouncedUpdateTask]);
}