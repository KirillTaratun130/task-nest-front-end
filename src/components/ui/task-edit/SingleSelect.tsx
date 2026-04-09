import {useOutSide} from "@/hooks/useOutSide";
import {cn} from "tailwind-variants";
import Badge from "@/components/ui/Badge";
import {X} from "lucide-react";

export interface IOption {
    label: string;
    value: string
}

interface ISingleSelect {
    data: IOption[];
    onChange: (value: string) => void;
    value: string;
    isColorSelect?: boolean
}

const SingleSelect = ({ data, onChange, value, isColorSelect }: ISingleSelect) => {
    const { isShow, setIsShow, ref } = useOutSide(false)
    const getValue = () => data.find(item => item.value === value)?.value

    return (
        <div className={cn(
            'relative min-w-36', { 'w-max': isColorSelect }
        )} ref={ref}>
            <button className='cursor-pointer' onClick={(e) => {
                e.preventDefault()
                setIsShow(!isShow)
            }}>
                { getValue() ? (
                    <Badge
                        variant={value}
                        className='capitalize'
                        style={isColorSelect ? { backgroundColor: value } : {} }>
                        { getValue() }
                    </Badge>
                ) : (
                    <Badge>Нажмите чтобы выбрать</Badge>
                ) }
            </button>

            { value && (
                <button className='absolute top-0 right-0 opacity-30 hover:opacity-100 transition cursor-pointer' onClick={(e) => {
                    e.preventDefault()
                    onChange('')
                }}>
                    <X size={14} />
                </button>
            ) }

            { isShow && (
                <div className={cn(
                    'absolute w-full p-2.5 left-0 slide bg-black z-10 shadow rounded-lg')}
                     style={{ top: 'calc(100% + .5rem' }}>
                    { data.map(item => (
                        <button key={item.value} onClick={(e) => {
                            e.preventDefault()
                            onChange(item.value)
                            setIsShow(false)
                        }} className='block mb-4 last:mb-0 capitalize rounded-lg' style={
                            isColorSelect ? { backgroundColor: item.value } : {}
                        }>
                            <Badge variant={item.value}>{ item.label }</Badge>
                        </button>
                    )) }
                </div>
            ) }
        </div>
    );
};

export default SingleSelect;