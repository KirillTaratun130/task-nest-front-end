import {useTaskStore} from "@/stores/task.store"

interface IKanbanAddCardInputProps {
    filterDate?: string
}

const KanbanAddCardInput = ({ filterDate }: IKanbanAddCardInputProps) => {
    const { setItems } = useTaskStore()

    const addRow = () => {
        setItems(prev => {
            if (!prev) {
                return
            }

            return [
                ...prev,
                {
                    id: '',
                    name: '',
                    isCompleted: false,
                    createdAt: filterDate
                }
            ]
        })
    }

    return (
        <div className='text-text-heading mb-10 w-[300px]'>
            <button onClick={addRow} className='italic opacity-40 text-md cursor-pointer'>
                Добавить задачу...
            </button>
        </div>
    )
}

export default KanbanAddCardInput
