import {useQuery} from "@tanstack/react-query";
import {timerService} from "@/services/timer.service";
import {Dispatch, SetStateAction, useEffect} from "react";
import {ITimerRoundResponse} from "@/types/timer.types";

interface IUseTodaySession {
    setActiveRound: Dispatch<SetStateAction<ITimerRoundResponse | undefined>>
    setSecondsLeft: Dispatch<SetStateAction<number>>
    workInterval: number
}

export const useTodaySession = ({ setActiveRound, setSecondsLeft, workInterval }: IUseTodaySession) => {
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
                setSecondsLeft(workInterval - activeRound.totalSeconds)
            }
        }
    }, [isSuccess, rounds, workInterval]);

    return { sessionResponse, isLoading, refetch, isSuccess }
}