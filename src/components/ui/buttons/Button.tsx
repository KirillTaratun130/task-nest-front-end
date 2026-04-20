import {ButtonHTMLAttributes, PropsWithChildren} from "react";
import cn from "clsx";

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ( { children, className, ...rest }: PropsWithChildren<TypeButton> ) => {
    return (
        <button className={cn('text-text-heading bg-primary-dark px-4 py-2 rounded-md hover:bg-primary-hover cursor-pointer transition', className)} {...rest}>{ children }</button>
    );
};

export default Button;