import {useQuery} from "@tanstack/react-query"
import {taskService} from "@/services/task.service"
import {useEffect} from "react"
import {useTaskStore} from "@/stores/task.store"

export const useTasks = () => {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	})

	const { setItems } = useTaskStore()

	useEffect(() => {
		if (data?.data) setItems(data?.data) // eslint-disable-line react-hooks/set-state-in-effect
	}, [data?.data]) // eslint-disable-line react-hooks/exhaustive-deps

}
