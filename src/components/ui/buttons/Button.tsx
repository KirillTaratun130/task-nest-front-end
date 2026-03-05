import {ButtonHTMLAttributes, PropsWithChildren} from "react";

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ( { children, ...rest }: PropsWithChildren<TypeButton> ) => {
    return (
        <button className='bg-primary-dark px-4 py-2 rounded-md hover:bg-primary-hover cursor-pointer transition' {...rest}>{ children }</button>
    );
};

export default Button;