'use client'

import {useProfile} from "@/hooks/useProfile";
import Loader from "@/components/ui/Loader";
import { type ReactNode } from 'react'
import { LayoutList, Check, Timer, Calendar } from 'lucide-react'

const STATISTIC_ICONS: Record<string, ReactNode> = {
    'Всего задач': <LayoutList className='text-white' size={22} />,
    'Завершено': <Check className='text-white' size={22} />,
    'На сегодня': <Timer className='text-white' size={22} />,
    'На неделю': <Calendar className='text-white' size={22} />,
}

const Statistics = () => {
    const { data, isLoading } = useProfile()

    return isLoading ? (
        <Loader />
    ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
            { data?.statistics.length ? data.statistics.map(statistic => (
                <div key={statistic.label} className='bg-gray-900/75 p-10 rounded-[26px] border-gray-800 border-[1px]'>
                    <div className='w-fit p-3 bg-gray-700/75 rounded-[16px] mb-4'>{ STATISTIC_ICONS[statistic.label] }</div>
                    <div className='text-4xl text-white pb-2'>{ statistic.value }</div>
                    <div className='text-xl text-gray-300'>{ statistic.label }</div>
                </div>
            )) : <div>Статистика не найдена</div> }
        </div>
    )


};

export default Statistics;