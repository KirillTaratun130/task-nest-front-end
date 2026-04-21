import {useTaskStore} from "@/stores/task.store"

interface IListAddRowInputProps {
    filterDate?: string
}

const ListAddRowInput = ({ filterDate }: IListAddRowInputProps) => {
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
        <div className='border-b-1 border-card-border p-2'>
            <button onClick={addRow} className='italic opacity-40 text-sm cursor-pointer'>
                Добавить задачу...
            </button>
        </div>
    )
}

export default ListAddRowInput
