import type {ITimeBlockResponse, TypeTimeBlockFromState} from "@/types/time-block.types";
import {useTimeBlockSortable} from "@/app/i/time-blocking/hooks/useTimeBlockSortable";
import {useFormContext} from "react-hook-form";
import {useDeleteTimeBlock} from "@/app/i/time-blocking/hooks/useDeleteTimeBlock";
import {Edit, GripVertical, Loader, Trash} from "lucide-react";

const TimeBlock = ({ item }: { item: ITimeBlockResponse }) => {
    const { attributes, listeners, setNodeRef, style } = useTimeBlockSortable(item.id)
    const { reset } = useFormContext<TypeTimeBlockFromState>()

    const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock(item.id)

    return (
        <div ref={setNodeRef} style={style}>
            <div className='flex items-center justify-between rounded-md p-2' style={{
                backgroundColor: item.color || 'lightgray',
                height: `${item.duration}px`
            }}>
                <div className='flex items-center'>
                    <button {...attributes} {...listeners} aria-describedby='time-block'>
                        <GripVertical className='text-text-heading hover:opacity-50 transition cursor-pointer' />
                    </button>
                    <div className='text-text-heading'>
                        { item.name }{' '}
                        <i className='text-xs opacity-50'>({ item.duration } мин.)</i>
                    </div>
                </div>
                <div className='flex gap-2 mr-2'>
                    <button onClick={() => {
                        reset({
                            id: item.id,
                            color: item.color,
                            duration: item.duration,
                            name: item.name,
                            order: item.order
                        })
                    }} className='transition hover:opacity-50 text-text-heading cursor-pointer'>
                        <Edit size={18}/>
                    </button>
                    <button onClick={() => deleteTimeBlock()} className='transition hover:opacity-50 text-text-heading cursor-pointer'>
                        { isDeletePending ? <Loader size={16} /> : <Trash size={18} /> }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeBlock;