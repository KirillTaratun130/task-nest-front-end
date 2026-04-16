import {useUpdateRound} from "@/app/i/timer/hooks/useUpdateRound";
import {useLoadSettings} from "@/app/i/timer/hooks/useLoadSettings";
import {ITimerState} from "@/app/i/timer/timer.types";
import {ITimerRoundResponse} from "@/types/timer.types";

type TypeUseTimerActions = ITimerState & {
    rounds: ITimerRoundResponse[] | undefined
}

export const useTimerActions = ({ activeRound, secondsLeft, setIsRunning, setActiveRound, rounds }: TypeUseTimerActions) => {
    const { workInterval } = useLoadSettings()
    const { isUpdateRoundPending, updateRound } = useUpdateRound()
    const pauseHandler = () => {
        const totalSeconds = (workInterval * 60) - secondsLeft

        setIsRunning(false)

        if (activeRound?.id) {
            updateRound({
                id: activeRound?.id,
                data: {
                    totalSeconds,
                    isCompleted: Math.floor(totalSeconds * 60) >= workInterval
                }
            })
        }
    }

    const playHandler = () => {
        setIsRunning(true)
    }

    const nextRoundHandler = () => {
        if (!activeRound?.id) {
            return
        }

        updateRound({
            id: activeRound?.id,
            data: {
                isCompleted: true,
                totalSeconds: workInterval * 60
            }
        })
    }

    const prevRoundHandler = () => {
        const lastCompletedRound = rounds?. findLast(round => round.isCompleted)

        if (!lastCompletedRound?.id) {
            return
        }

        updateRound({
            id: lastCompletedRound?.id,
            data: {
                isCompleted: false,
                totalSeconds: 0
            }
        })

        setActiveRound(lastCompletedRound)
    }

    return {
        isUpdateRoundPending,
        pauseHandler,
        playHandler,
        nextRoundHandler,
        prevRoundHandler
    }

}