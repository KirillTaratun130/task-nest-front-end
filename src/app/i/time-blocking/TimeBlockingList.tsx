import {useTimeBlocks} from "@/app/i/time-blocking/hooks/useTimeBlocks";
import {useTimeBlockDnd} from "@/app/i/time-blocking/hooks/useTimeBlockDnd";
import Loader from "@/components/ui/Loader";
import {calcHoursLeft} from "@/app/i/time-blocking/calc-hours-left";
import {closestCenter, DndContext} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import TimeBlock from "@/app/i/time-blocking/TimeBlock";

const TimeBlockingList = () => {
    const { items, setItems, isLoading } = useTimeBlocks()
    const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems)

    if (isLoading) return <Loader />

    const hoursLeft = calcHoursLeft(items)

    return (
        <div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className='flex flex-col gap-2'>
                    <SortableContext items={items || []} strategy={verticalListSortingStrategy}>
                        { items?.length ? (
                            items?.map(item => (
                                <TimeBlock item={item} key={item.id} />
                            ))
                        ) : (
                         <div className='text-text-body'>Добавьте первый временной блок справа</div>
                        )}
                    </SortableContext>
                </div>
            </DndContext>
            <div className='text-text-body mt-4'>
                { hoursLeft > 0 ? `${hoursLeft} часа из 24 осталось для сна !` : 'На сон часов не осталось !' }
            </div>
        </div>
    );
};

export default TimeBlockingList;