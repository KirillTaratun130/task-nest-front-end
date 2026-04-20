import {Controller, SubmitHandler, useFormContext} from "react-hook-form";
import {TypeTimeBlockFromState} from "@/types/time-block.types";
import {useUpdateTimeBlock} from "@/app/i/time-blocking/form/useUpdateTimeBlock";
import {useCreateTimeBlock} from "@/app/i/time-blocking/form/useCreateTimeBlock";
import {COLORS} from "@/app/i/time-blocking/form/colors.data";
import Field from "@/components/ui/fields/Field";
import SingleSelect from "@/components/ui/task-edit/SingleSelect";
import Button from "@/components/ui/buttons/Button";

const TimeBlockingForm = () => {
    const { register, control, watch, reset, handleSubmit, getValues } = useFormContext<TypeTimeBlockFromState>()

    const existsId = watch('id')
    const { updateTimeBlock } = useUpdateTimeBlock()
    const { createTimeBlock, isPending } = useCreateTimeBlock()

    const onSubmit: SubmitHandler<TypeTimeBlockFromState> = (data) => {
        const { color, id, ...rest } = data
        const dto = { ...rest, color: color || undefined }

        if (id) {
            updateTimeBlock({
                id,
                data: dto
            })
        } else {
            createTimeBlock(dto)
        }

        reset({
            color: COLORS[COLORS.length - 1],
            duration: 0,
            name: '',
            id: undefined,
            order: 1
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-3/5'>
            <Field
                id='name'
                label='Имя:'
                placeholder='Введите имя:'
                type='text'
                extra='mb-4'
                {...register('name', {
                    required: true
                })} />

            <Field
                id='duration'
                label='Интервал:'
                placeholder='Введите интервал:'
                extra='mb-4'
                type='number'
                {...register('duration', {
                    required: true,
                    valueAsNumber: true
                })} />

            <div>
                <span className='inline-block mb-1.5 text-text-body'>Цвет:</span>
                <Controller control={control} name='color'  render={({ field: { value, onChange } }) => (
                    <SingleSelect data={COLORS.map(item => ({
                        value: item,
                        label: item
                    }))} onChange={onChange} value={value || COLORS[COLORS.length - 1]} isColorSelect />
                )} />
            </div>
            <Button type='submit' disabled={isPending} className='mt-6'>
                { existsId ? 'Обновить' : 'Создать' }
            </Button>
        </form>
    );
};

export default TimeBlockingForm;