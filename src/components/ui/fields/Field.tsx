import { forwardRef, InputHTMLAttributes } from 'react'

interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string
	label?: string
	placeholder?: string
	type?: string
	extra?: string
	error?: string
}

const Field = forwardRef<HTMLInputElement, IFieldProps>(
	({ id, label, placeholder, type = 'text', extra, error, ...rest }, ref) => {
		return (
			<div className={extra}>
				<label
					htmlFor={id}
					className='block mb-2 text-sm font-medium text-text-body'
				>
					{label}
				</label>
				<input
					ref={ref}
					id={id}
					type={type}
					placeholder={placeholder}
					className={`w-full px-4 py-3 bg-input-bg border-input-border border-1 rounded-md outline-none placeholder-input-placeholder text-text-body focus:border-input-focus transition ${
						error
							? 'border-red-500 focus:border-red-600'
							: 'border-input-border focus:border-input-focus'
					}`}
					{...rest}
				/>
				{error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field