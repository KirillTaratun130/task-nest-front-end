'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {TypeUserForm} from "@/types/auth.types";
import {useInitialData} from "@/app/i/settings/useInitialData";
import {useUpdateSettings} from "@/app/i/settings/useUpdateSettings";
import Field from "@/components/ui/fields/Field";
import Button from "@/components/ui/buttons/Button";

const Settings = () => {
    const { register, handleSubmit, reset } = useForm<TypeUserForm>({
        mode: "onChange",
    })

    useInitialData(reset)
    const { mutate, isPending } = useUpdateSettings()

    const onSubmit: SubmitHandler<TypeUserForm> = data => {
        const { password, ...rest } = data

        mutate({
            ...rest,
            password: password || undefined
        })
    }

    return (
        <div className='mt-12'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-2/4'>
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <Field
                            id='email'
                            label='Email:'
                            placeholder='Введите email'
                            type='email'
                            extra='mb-4'
                            {...register('email')} />
                        <Field
                            id='name'
                            label='Имя:'
                            placeholder='Введите имя'
                            type='text'
                            extra='mb-4'
                            {...register('name')} />
                        <Field
                            id='password'
                            label='Пароль:'
                            placeholder='Введите пароль'
                            type='password'
                            extra='mb-6'
                            {...register('password')} />
                    </div>
                    <div>
                        <Field
                            id='workInterval'
                            label='Интервал работы (мин.):'
                            placeholder='Введите интервал работы (мин.)'
                            type='number'
                            extra='mb-4'
                            {...register('workInterval', {
                                valueAsNumber: true
                            })} />
                        <Field
                            id='breakInterval'
                            label='Интервал перерыва (мин.):'
                            placeholder='Введите интервал перерыва (мин.)'
                            type='number'
                            extra='mb-4'
                            {...register('breakInterval', {
                                valueAsNumber: true
                            })} />
                        <Field
                            id='intervalsCount'
                            label='Количетсво интервалов (макс. 10):'
                            placeholder='Введите количество интервалов (макс. 10)'
                            type='number'
                            extra='mb-6'
                            {...register('intervalsCount', {
                                valueAsNumber: true
                            })} />
                    </div>
                </div>
                <Button type="submit" disabled={isPending}>
                    Сохранить
                </Button>
            </form>
        </div>
    );
};

export default Settings;