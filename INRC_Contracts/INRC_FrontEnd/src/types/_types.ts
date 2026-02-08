import { ButtonHTMLAttributes, ReactNode } from "react"

export type TOnboard = {
    children: ReactNode,
    header: ReactNode,
}

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string,
    fluid?: boolean,
    loading?: boolean,
}
