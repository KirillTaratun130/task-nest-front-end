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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12'>
            { data?.statistics.length ? data.statistics.map(statistic => (
                <div key={statistic.label} className='hover:scale-105 cursor-pointer bg-card p-10 rounded-[26px] border-card border-[1px] transition'>
                    <div className='w-fit p-3 bg-gray-700/75 rounded-[16px] mb-4'>{ STATISTIC_ICONS[statistic.label] }</div>
                    <div className='text-4xl text-text-body pb-2'>{ statistic.value }</div>
                    <div className='text-xl text-text-body'>{ statistic.label }</div>
                </div>
            )) : <div>Статистика не найдена</div> }
        </div>
    )


};

export default Statistics;