import {useMutation, useQueryClient} from "@tanstack/react-query";
import {timeBlockService} from "@/services/time-block.service";
import {TypeTimeBlockFromState} from "@/types/time-block.types";

export const useUpdateTimeBlock = () => {
    const queryClient = useQueryClient()

    const { mutate: updateTimeBlock } = useMutation({
        mutationKey: ['update time-block'],
        mutationFn: ({id, data}: {id: string, data: TypeTimeBlockFromState}) => timeBlockService.updateTimeBlock(id, data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['time-blocks']
            })
        }
    })

    return { updateTimeBlock }
}