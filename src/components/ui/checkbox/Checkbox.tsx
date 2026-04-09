interface ICheckboxProps {
	onChange: (value: boolean) => void
	checked: boolean | undefined
}

const Checkbox = ({ onChange, checked }: ICheckboxProps) => {
	return (
		<label className='relative inline-flex h-5 w-5 shrink-0 cursor-pointer'>
			<input
				type='checkbox'
				checked={checked}
				onChange={e => onChange(e.target.checked)}
				className='peer sr-only'
			/>
			<span
				className='
					h-5
					w-5
					rounded-md
					border
					border-input-border
					bg-input-bg
					transition-all
					peer-checked:border-primary
					peer-checked:bg-primary
					hover:border-primary/60
				'
			/>
			<svg
				className='
					pointer-events-none
					absolute
					left-1/2
					top-1/2
					h-3
					w-3
					-translate-x-1/2
					-translate-y-1/2
					opacity-0
					transition-opacity
					peer-checked:opacity-100
				'
				viewBox='0 0 24 24'
				fill='none'
				stroke='white'
				strokeWidth='3.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<polyline points='20 6 9 17 4 12' />
			</svg>
		</label>
	)
}

export default Checkbox