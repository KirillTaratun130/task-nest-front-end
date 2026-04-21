import {useTaskDebounce} from "@/app/i/tasks/hooks/useTaskDebounce"
import {Controller, useForm} from "react-hook-form"
import type {ITaskResponse, TypeTaskFormState} from "@/types/task.types"
import {GripVertical, Loader, Trash} from "lucide-react"
import Checkbox from "@/components/ui/checkbox/Checkbox"
import DatePicker from "@/components/ui/task-edit/date-picker/DatePicker"
import SingleSelect from "@/components/ui/task-edit/SingleSelect"
import {useDeleteTask} from "@/app/i/tasks/hooks/useDeleteTask"
import TransparentField from "@/components/ui/fields/TransparentField"
import {LEVEL, LEVEL_LABEL} from "@/app/i/tasks/level.data"
import {useTaskStore} from "@/stores/task.store"

interface IKanbanCardProps {
    item: ITaskResponse
}

const KanbanCard = ({ item }: IKanbanCardProps) => {
    const { deleteTask, isDeletePending } = useDeleteTask()
    const { setItems } = useTaskStore()

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
        <div className='text-text-heading flex flex-col w-[300px] gap-3 rounded-sm px-4 py-5 border border-card-border relative'>
            <div className=''>
                <span className='flex items-center gap-2.5'>

                    <button aria-describedby='todo-item' className='absolute right-2 top-2 cursor-pointer'>
                        <GripVertical />
                    </button>

                    <Controller control={control} name='isCompleted' render={({ field: { value, onChange } }) => (
                        <Checkbox onChange={onChange} checked={value}  />
                    )} />

                    <TransparentField className='max-w-[210px] break-all' {...register('name')} />
                </span>
            </div>
            <div className='max-w-[160px]'>
                <Controller control={control} name='createdAt' render={({ field: { value, onChange } }) => (
                    <DatePicker onChange={onChange} value={value || ''} />
                )} />
            </div>
            <div className='max-w-[144px]'>
                <Controller control={control} name='priority' render={({ field: { value, onChange } }) => (
                    <SingleSelect data={LEVEL.map(item =>({
                        value: item,
                        label: LEVEL_LABEL[item]
                    }))} onChange={onChange} value={value || ''} />
                )} />
            </div>
            <div className='absolute bottom-2 right-2'>
                <button className='cursor-pointer' onClick={() =>
                item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}>
                    {isDeletePending ? <Loader size={15} /> : <Trash size={15} /> }
                </button>
            </div>
        </div>
    )
}

export default KanbanCard
