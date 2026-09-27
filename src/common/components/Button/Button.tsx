import type {ButtonHTMLAttributes, ReactNode} from "react";
import s from './Button.module.css'

type ButtonVariant = "primary" | "secondary" | "ghost"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    children: ReactNode
}

export const Button = ({variant = "primary", children, className, ...props}: ButtonProps) => {
    return (
        <button className={`${s.button} ${s[variant]} ${className || ""}`}{...props}>
            {children}
        </button>
    )
}