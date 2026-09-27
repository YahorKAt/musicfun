import s from "./Loader.module.css"

type Props = {
    size?: number
    strokeWidth?: number
}

export const Loader = ({size = 80, strokeWidth = 6}: Props) => {
    return (
        <div className={s.loaderContainer}>
            <svg
                className={s.loader}
                width={size}
                height={size}
                viewBox="0 0 80 80"
            >
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF38B6"/>
                        <stop offset="100%" stopColor="#9C27B0"/>
                    </linearGradient>
                </defs>
                <circle
                    className={s.circle}
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            </svg>
        </div>
    )
}