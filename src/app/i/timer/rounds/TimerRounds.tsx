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
        <div className=''>
            <button
                className=''
                disabled={!isCanPrevRound}
                onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
            >
                <ChevronLeft size={22}/>
            </button>
            <div className=''>
                {rounds && rounds.map((round, index) => (
                    <div key={index} className={cn(styles.round, {
                        [styles.completed]: round.isCompleted,
                        [styles.active]: round.id === activeRound?.id && !round.isCompleted
                    })}>

                    </div>
                ))}
            </div>
            <button
                className=''
                disabled={!isCanNextRound}
                onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
            >
                <ChevronRight size={22}/>
            </button>
        </div>
    );
};

export default TimerRounds;