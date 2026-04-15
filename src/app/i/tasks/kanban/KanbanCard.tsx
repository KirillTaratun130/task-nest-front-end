import { useTaskDebounce } from "@/app/i/tasks/hooks/useTaskDebounce";
import type { Dispatch, SetStateAction } from "react";
import {Controller, useForm} from "react-hook-form";
import type { ITaskResponse, TypeTaskFormState } from "@/types/task.types";
import {GripVertical, Loader, Trash} from "lucide-react";
import Checkbox from "@/components/ui/checkbox/Checkbox";
import DatePicker from "@/components/ui/task-edit/date-picker/DatePicker";
import SingleSelect from "@/components/ui/task-edit/SingleSelect";
import {useDeleteTask} from "@/app/i/tasks/hooks/useDeleteTask";

import TransparentField from "@/components/ui/fields/TransparentField";

interface IKanbanRowProps {
    item: ITaskResponse
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const KanbanCard = ({ item, setItems }: IKanbanRowProps) => {
    const { deleteTask, isDeletePending } = useDeleteTask()

    const { register, control, watch } = useForm<TypeTaskFormState>({
        defaultValues: {
            name: item.name,
            isCompleted: item.isCompleted,
            createdAt: item.createdAt,
            priority: item.priority
        }
    })

    useTaskDebounce({ watch, itemId: item.id })

    return (
        <div className='grid grid-cols-[600px_1fr_1fr_40px]'>
            <div className='border-1 border-card-border p-2 border-l-0 border-t-0'>
                <span className='flex items-center gap-2'>

                    <button aria-describedby='todo-item'>
                        <GripVertical className='hover:opacity-70 transition' />
                    </button>

                    <Controller control={control} name='isCompleted' render={({ field: { value, onChange } }) => (
                        <Checkbox onChange={onChange} checked={value}  />
                    )} />

                    <TransparentField {...register('name')} />
                </span>
            </div>
            <div className='border-1 border-card-border p-2'>
                <Controller control={control} name='createdAt' render={({ field: { value, onChange } }) => (
                    <DatePicker onChange={onChange} value={value || ''} />
                )} />
            </div>
            <div className='capitalize border-1 border-card-border p-2'>
                <Controller control={control} name='priority' render={({ field: { value, onChange } }) => (
                    <SingleSelect data={['high', 'medium', 'low'].map(item =>({
                        value: item,
                        label: item
                    }))} onChange={onChange} value={value || ''} />
                )} />
            </div>
            <div className='border-1 border-card-border p-2 border-r-0 flex items-center justify-center'>
                <button className='opacity-50 transition hover:opacity-100 cursor-pointer' onClick={() =>
                item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}>
                    {isDeletePending ? <Loader size={15} /> : <Trash size={15} /> }
                </button>
            </div>
        </div>
    );
};

export default KanbanCard;