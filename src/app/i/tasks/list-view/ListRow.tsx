import cn from "clsx";
import { useTaskDebounce } from "@/app/i/tasks/hooks/useTaskDebounce";
import type { Dispatch, SetStateAction } from "react";
import {Controller, useForm} from "react-hook-form";
import type { ITaskResponse, TypeTaskFormState } from "@/types/task.types";
import {GripVertical, Loader, Trash} from "lucide-react";
import Checkbox from "@/components/ui/checkbox/Checkbox";
import DatePicker from "@/components/ui/task-edit/date-picker/DatePicker";
import SingleSelect from "@/components/ui/task-edit/SingleSelect";
import {useDeleteTask} from "@/app/i/tasks/hooks/useDeleteTask";

import styles from './ListView.module.css'
import TransparentField from "@/components/ui/fields/TransparentField";

interface IListRowProps {
    item: ITaskResponse
    setItems: Dispatch<SetStateAction<ITaskResponse[]>>
}

const ListRow = ({ item, setItems }: IListRowProps) => {
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
        <div className={cn(styles.row, watch('isCompleted') ? styles.completed : '', 'animation-opacity')}>
            <div>
                <span className='inline-flex items-center gap-2.5 w-full'>

                    <button aria-describedby='todo-item'>
                        <GripVertical className={styles.grip} />
                    </button>

                    <Controller control={control} name='isCompleted' render={({ field: { value, onChange } }) => (
                        <Checkbox onChange={onChange} checked={value}  />
                    )} />

                    <TransparentField {...register('name')} />
                </span>
            </div>
            <div>
                <Controller control={control} name='createdAt' render={({ field: { value, onChange } }) => (
                    <DatePicker onChange={onChange} value={value || ''} />
                )} />
            </div>
            <div className='capitalize'>
                <Controller control={control} name='priority' render={({ field: { value, onChange } }) => (
                    <SingleSelect data={['high', 'medium', 'low'].map(item =>({
                        value: item,
                        label: item
                    }))} onChange={onChange} value={value || ''} />
                )} />
            </div>
            <div>
                <button className='opacity-50 transition hover:opacity-100' onClick={() =>
                item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}>
                    {isDeletePending ? <Loader size={15} /> : <Trash size={15} /> }
                </button>
            </div>
        </div>
    );
};

export default ListRow;