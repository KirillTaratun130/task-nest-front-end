interface ICheckboxProps {
    onChange: (value: boolean) => void
    checked: boolean | undefined
}

const Checkbox = ({ onChange, checked }: ICheckboxProps) => {
    return (
        <input
            type='checkbox'
            checked={checked}
            onChange={e => onChange(e.target.checked)}
            className='
                defaultCheckbox
                relative
                h-5
                w-5
                appearance-none
                rounded-md
                border
                border-input-border
                bg-input-bg
                transition-all
                cursor-pointer
                checked:border-primary
                checked:bg-primary
                hover:border-primary/60'
        />
    )
}

export default Checkbox