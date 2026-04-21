import {create} from 'zustand'
import {ITaskResponse} from '@/types/task.types'

interface ITaskStore {
	items: ITaskResponse[] | undefined
	setItems: (
		items:
			| ITaskResponse[]
			| undefined
			| ((prev: ITaskResponse[] | undefined) => ITaskResponse[] | undefined)
	) => void
}

export const useTaskStore = create<ITaskStore>((set, get) => ({
	items: undefined,
	setItems: items =>
		set({
			items: typeof items === 'function' ? items(get().items) : items
		})
}))
