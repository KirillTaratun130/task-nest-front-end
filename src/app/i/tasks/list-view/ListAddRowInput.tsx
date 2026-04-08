import {Dispatch, SetStateAction} from "react";
import {ITaskResponse} from "@/types/task.types";

interface IListAddRowInputProps {
    filterDate?: string
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const ListAddRowInput = ({ filterDate, setItems }: IListAddRowInputProps) => {
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
        <div className=''>
            <button onClick={addRow} className='italic opacity-40 text-sm'>
                Add task...
            </button>
        </div>
    );
};

export default ListAddRowInput;