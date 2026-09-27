import s from './LinearProgress.module.css'

type Props = {
    height?: number
}

export const LinearProgress = ({ height = 2 }: Props) => {
    return (
        <div className={s.root} style={{ height }}>
            <div className={`${s.bar} ${s.indeterminate1}`} />
            <div className={`${s.bar} ${s.indeterminate2}`} />
        </div>
    )
}