import {useLoadSettings} from "@/app/i/timer/hooks/useLoadSettings";
import {useEffect, useState} from "react";
import type {ITimerRoundResponse} from "@/types/timer.types";
import {clearInterval} from "node:timers";
import type {ITimerState} from "@/app/i/timer/timer.types";

export const useTimer = (): ITimerState => {
    const { workInterval, breakInterval } = useLoadSettings()

    const [ isRunning, setIsRunning ] = useState(false)
    const [ isBreakTime, setIsBreakTime ] = useState(false)

    const [ secondsLeft, setSecondsLeft ] = useState(workInterval * 60)
    const [ activeRound, setActiveRound ] = useState<ITimerRoundResponse>()

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isRunning) {
            interval = setInterval(() => {
                setSecondsLeft(secondsLeft => secondsLeft - 1)
            }, 1000)
        } else if (!isRunning && secondsLeft !== 0 && interval) {
            clearInterval(interval)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning, secondsLeft, workInterval, activeRound]);

    useEffect(() => {
        if(secondsLeft > 0) {
            return
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsBreakTime(!isBreakTime)
        setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60)
    }, [secondsLeft, isBreakTime, workInterval, breakInterval]);

    return {
        activeRound,
        secondsLeft,
        setActiveRound,
        setIsRunning,
        setSecondsLeft
    }

}