import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TypeUserForm} from "@/types/auth.types";
import {userService} from "@/services/user.service";
import {toast} from "sonner";

export const useUpdateSettings = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey: ['update profile'],
        mutationFn: (data: TypeUserForm) => userService.update(data),
        onSuccess: () => {
            toast.success('Профиль успешно обновлен!')
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        }
    })

    return { mutate, isPending }
}