import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import {useState} from "react";
import {DayPicker, SelectSingleEventHandler} from "react-day-picker";
import {X} from "lucide-react";
import {cn} from "tailwind-variants";
import {useOutSide} from "@/hooks/useOutSide";

dayjs.extend(LocalizedFormat)

interface IDatePicker {
    onChange: (value: string) => void;
    value: string;
    position?: 'left' | 'right'
}

const DatePicker = ({ onChange, value, position = 'right' }: IDatePicker) => {
    const [ selected, setSelected ] = useState<Date>()
    const { isShow, setIsShow, ref } = useOutSide(false)

    const handleDaySelect: SelectSingleEventHandler = date => {
        const ISOdate = date?.toISOString()

        setSelected(date)
        if (ISOdate) {
            onChange(ISOdate)
            setIsShow(false)
        } else {
            onChange('')
        }
    }

    return (
        <div className='relative' ref={ref}>
            <button onClick={() => setIsShow(!isShow)}>
                { value ? dayjs(value).format('LL') : 'Нажмите чтобы выбрать' }
            </button>
            { value && (
                <button className='absolute -top-2 -right-4 opacity-30 hover:opacity-100 transition' onClick={() => onChange('')}>
                    <X size={14} />
                </button>
            ) }

            { isShow && (
                <div className={cn(
                    'absolute p-2.5 slide bg-black z-10 shadow rounded-lg',
                    position === 'left' ? '-left-4' : '-right-4'
                )} style={{ top: 'calc(100% + .7rem' }}>
                    <DayPicker
                        fromYear={2026}
                        toYear={2040}
                        initialFocus={isShow}
                        mode='single'
                        defaultMonth={selected}
                        selected={selected}
                        onSelect={handleDaySelect}
                        weekStartsOn={1} />
                </div>
            ) }
        </div>
    )
}

export default DatePicker