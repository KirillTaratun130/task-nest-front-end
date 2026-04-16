'use client'

import {useTimer} from "@/app/i/timer/hooks/useTimer";
import {useTodaySession} from "@/app/i/timer/hooks/useTodaySession";
import {useTimerActions} from "@/app/i/timer/hooks/useTimerActions";
import Loader from "@/components/ui/Loader";
import TimerRounds from "@/app/i/timer/rounds/TimerRounds";
import {Pause, Play, RefreshCcw} from "lucide-react";
import Button from "@/components/ui/buttons/Button";

import { formatTime } from './format-time'
import {useDeleteSession} from "@/app/i/timer/hooks/useDeleteSession";
import {useCreateSession} from "@/app/i/timer/hooks/useCreateSession";

const Timer = () => {
    const timerState = useTimer()
    const { isLoading, sessionResponse, workInterval } = useTodaySession(timerState)

    const rounds = sessionResponse?.data.rounds
    const actions = useTimerActions({...timerState, rounds})

    const { mutate, isPending } = useCreateSession()
    const { deleteSession, isDeletePending } = useDeleteSession(() => timerState.setSecondsLeft(workInterval * 60))

    return (
        <div className='relative w-80 text-center flex flex-col items-center gap-6'>
            { !isLoading && (
                <div className='text-7xl font-semibold text-text-heading mt-12'>{ formatTime(timerState.secondsLeft) }</div>
            )}
            { isLoading ? (
                <Loader />
            ) : sessionResponse?.data ? (
                <>
                    <TimerRounds
                        rounds={rounds}
                        nextRoundHandler={actions.nextRoundHandler}
                        prevRoundHandler={actions.prevRoundHandler}
                        activeRound={timerState.activeRound}
                    />
                    <button
                        className='opacity-80 hover:opacity-100 transition text-text-body cursor-pointer'
                        onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler}
                        disabled={actions.isUpdateRoundPending}
                    >
                        { timerState.isRunning ? <Pause size={30} /> : <Play size={30} /> }
                    </button>
                    <button
                        className='absolute top-4 right-2 opacity-40 hover:opacity-90 transition cursor-pointer text-text-body'
                        onClick={() => {
                            timerState.setIsRunning(false)
                            deleteSession(sessionResponse.data.id)
                        }}
                        disabled={isDeletePending}
                    >
                        <RefreshCcw size={20} />
                    </button>
                </>
            ) : (
                <Button
                    onClick={() => mutate()}
                    disabled={isPending}
                >
                    Создать сеанс
                </Button>
            )}
        </div>
    );
};

export default Timer;