import {type ReactNode, useEffect, useRef} from "react"
import {X} from "lucide-react"
import s from "./Modal.module.css"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

export const Modal = ({isOpen, onClose, title, children}: ModalProps) => {
    const overlayRef = useRef<HTMLDivElement>(null)

    // Закрытие по Escape
    useEffect(() => {
        if (!isOpen) return

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        document.addEventListener("keydown", handleEscape)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = ""
        }
    }, [isOpen, onClose])

    // Закрытие по клику на оверлей
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose()
    }

    if (!isOpen) return null

    return (
        <div ref={overlayRef} className={s.overlay} onClick={handleOverlayClick}>
            <div className={s.modal}>
                <div className={s.header}>
                    <h2 className={s.title}>{title}</h2>
                    <button className={s.closeBtn} onClick={onClose} aria-label="Close">
                        <X size={20}/>
                    </button>
                </div>
                <div className={s.body}>{children}</div>
            </div>
        </div>
    )
}