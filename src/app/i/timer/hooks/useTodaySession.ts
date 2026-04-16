import {useQuery} from "@tanstack/react-query";
import {timerService} from "@/services/timer.service";
import {Dispatch, SetStateAction, useEffect} from "react";
import {ITimerRoundResponse} from "@/types/timer.types";
import {useLoadSettings} from "@/app/i/timer/hooks/useLoadSettings";
import type {ITimerState} from "@/app/i/timer/timer.types";

export const useTodaySession = ({ setActiveRound, setSecondsLeft }: ITimerState) => {
    const { workInterval } = useLoadSettings()
    const { data: sessionResponse, isLoading, refetch, isSuccess } = useQuery({
        queryKey: ['get today session'],
        queryFn: () => timerService.getTodaySession()
    })

    const rounds = sessionResponse?.data.rounds

    useEffect(() => {
        if (isSuccess && rounds) {
            const activeRound = rounds.find(round => !round.isCompleted)
            setActiveRound(activeRound)

            if (activeRound && activeRound.totalSeconds !== 0) {
                setSecondsLeft(activeRound.totalSeconds)
            }
        }
    }, [isSuccess, rounds, workInterval]);

    return { sessionResponse, isLoading, workInterval }
}