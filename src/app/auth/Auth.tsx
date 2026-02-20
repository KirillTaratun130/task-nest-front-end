'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthForm} from "@/types/auth.types";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth.service";
import {toast} from "sonner";
import {DASHBOARD_PAGES} from "@/config/pages-url.config";
import Heading from "@/components/ui/Heading";
import Field from "@/components/ui/fields/Field";
import Button from "@/components/ui/buttons/Button";


const Auth = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IAuthForm>({
        mode: "onChange"
    })
    const [ isLoginForm, setIsLoginForm ] = useState(false)
    const { push } = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess() {
            toast.success('Successfully login!')
            reset()
            push(DASHBOARD_PAGES.HOME)
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }

    return (
        <div className='flex min-h-screen'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-100 m-auto shadow  rounded-xl p-layout bg-gray-900/75 p-14 border-gray-800 border-[1px]'>
                <Heading title='Вход' />
                <Field
                    id='email'
                    label='Email:'
                    placeholder='Введите email'
                    type='email'
                    extra='mb-4'
                    error={errors.email?.message}
                    {...register('email', {
                        required: 'Email обязателен!'
                    })} />
                <Field
                    id='password'
                    label='Пароль:'
                    placeholder='Введите пароль'
                    type='password'
                    extra='mb-8'
                    error={errors.password?.message}
                    {...register('password', {
                        required: 'Пароль обязателен!'
                    })} />
                <div className='text-white flex items-center gap-5 justify-center'>
                    <Button onClick={() => setIsLoginForm(true)}>Войти</Button>
                    <Button onClick={() => setIsLoginForm(false)}>Зарегистрироваться</Button>
                </div>
            </form>
        </div>
    );
};

export default Auth;