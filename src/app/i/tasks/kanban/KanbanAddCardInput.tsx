import {Dispatch, SetStateAction} from "react";
import {ITaskResponse} from "@/types/task.types";

interface IKanbanAddRowInputProps {
    filterDate?: string
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const KanbanAddCardInput = ({ filterDate, setItems }: IKanbanAddRowInputProps) => {
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
    );
};

export default KanbanAddCardInput;