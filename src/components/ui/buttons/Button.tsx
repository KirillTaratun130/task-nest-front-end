import {ButtonHTMLAttributes, PropsWithChildren} from "react";

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ( { children, ...rest }: PropsWithChildren<TypeButton> ) => {
    return (
        <button className='bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer transition' {...rest}>{ children }</button>
    );
};

export default Button;