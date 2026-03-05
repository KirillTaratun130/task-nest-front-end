'use client'

import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth.service";
import {useRouter} from "next/navigation";
import {LogOut} from "lucide-react";

const LogoutButton = () => {
    const router = useRouter()
    const { mutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess: () => router.push('/auth/')
    })

    return (
        <button className='cursor-pointer opacity-20 hover:opacity-100 transition' onClick={() => mutate()}>
            <LogOut size={26} color='white' />
        </button>
    );
};

export default LogoutButton;