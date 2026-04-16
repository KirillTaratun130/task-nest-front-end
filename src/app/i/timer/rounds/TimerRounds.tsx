import {ITimerRoundResponse} from "@/types/timer.types";
import {ChevronLeft, ChevronRight} from "lucide-react";
import cn from "clsx";

interface ITimerRounds {
    rounds: ITimerRoundResponse[] | undefined
    nextRoundHandler: () => void
    prevRoundHandler: () => void
    activeRound: ITimerRoundResponse | undefined
}



const TimerRounds = (
    { rounds, nextRoundHandler, prevRoundHandler, activeRound }: ITimerRounds
) => {
    const isCanPrevRound = rounds ? rounds.some(round => round.isCompleted) : false
    const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false

    return (
        <div className='flex flex-row items-center gap-2.5 text-text-body'>
            <button
                className='cursor-pointer'
                disabled={!isCanPrevRound}
                onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
            >
                <ChevronLeft size={26}/>
            </button>
            <div>
                <div className='flex flex-row gap-2'>
                    {rounds && rounds.map((round, index) => (
                        <div key={index} className={cn('w-5 h-5 rounded-md border border-card-border transition-all duration-300', {
                            'bg-primary border-primary': round.isCompleted,
                            'bg-secondary border-secondary animate-pulse shadow-[0_0_8px_rgba(249,121,17,0.6)]':
                                round.id === activeRound?.id && !round.isCompleted,
                        })}>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className='cursor-pointer'
                disabled={!isCanNextRound}
                onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
            >
                <ChevronRight size={26}/>
            </button>
        </div>
    );
};

export default TimerRounds;