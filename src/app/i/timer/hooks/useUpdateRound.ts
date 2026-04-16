import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TypeTimerRoundState} from "@/types/timer.types";
import {timerService} from "@/services/timer.service";

interface updateRoundMutationFn {
    id: string,
    data: TypeTimerRoundState
}

export const useUpdateRound = () => {
    const queryClient = useQueryClient()

    const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
        mutationKey: ['update round'],
        mutationFn: ({ id, data }: updateRoundMutationFn) => {
            return timerService.updateRound(id, data)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['get today session'] })
        }
    })

    return { updateRound, isUpdateRoundPending }
}