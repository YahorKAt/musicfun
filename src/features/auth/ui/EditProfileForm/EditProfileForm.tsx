import {useRef, useState} from "react"
import {ImagePlus, X} from "lucide-react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {Modal} from "@/common/components/Modal/Modal"
import {Button} from "@/common/components"
import s from "./EditProfileForm.module.css"

// Схема валидации
const editProfileSchema = z.object({
    name: z.string().min(1, "Name is required").max(50),
    surname: z.string().min(1, "Surname is required").max(50),
})

type EditProfileInputs = z.infer<typeof editProfileSchema>

interface EditProfileFormProps {
    isOpen: boolean
    onClose: () => void
    currentName?: string
    currentSurname?: string
    currentAvatarUrl?: string
}

export const EditProfileForm = ({
                                    isOpen,
                                    onClose,
                                    currentName = "",
                                    currentSurname = "",
                                    currentAvatarUrl,
                                }: EditProfileFormProps) => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(currentAvatarUrl || null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const {
        register,
        reset,
        formState: {errors},
    } = useForm<EditProfileInputs>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: currentName,
            surname: currentSurname,
        },
    })

    // Загрузка аватара
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
        if (!allowedTypes.includes(file.type)) {
            alert("Only JPEG, PNG or GIF are allowed!")
            return
        }

        const maxSize = 2 * 1024 * 1024 // 2MB
        if (file.size > maxSize) {
            alert("Max size is 2MB!")
            return
        }

        setAvatarFile(file)
        setAvatarPreview(URL.createObjectURL(file))
    }

    const removeAvatar = () => {
        setAvatarFile(null)
        setAvatarPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }


    const handleClose = () => {
        reset()
        removeAvatar()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Edit profile">
            <div className={s.form}>
                {/* Загрузка аватара */}
                <div className={s.avatarSection}>
                    <div className={s.avatarPreview} onClick={() => fileInputRef.current?.click()}>
                        {avatarPreview ? (
                            <>
                                <img
                                    src={avatarPreview}
                                    alt="Avatar preview"
                                    className={s.avatarImage}
                                />
                                <button
                                    type="button"
                                    className={s.removeAvatarBtn}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeAvatar()
                                    }}
                                >
                                    <X size={20}/>
                                </button>
                            </>
                        ) : (
                            <ImagePlus size={48} className={s.avatarIcon}/>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleAvatarChange}
                        className={s.hiddenInput}
                    />

                    <button
                        type="button"
                        className={s.uploadBtn}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Upload Avatar
                    </button>
                </div>

                {/* Name */}
                <div className={s.field}>
                    <label className={s.label}>Name</label>
                    <input
                        {...register("name")}
                        className={`${s.input} ${errors.name ? s.inputError : ""}`}
                        placeholder="Placeholder"
                    />
                    {errors.name && <span className={s.errorText}>{errors.name.message}</span>}
                </div>

                {/* Surname */}
                <div className={s.field}>
                    <label className={s.label}>Surname</label>
                    <input
                        {...register("surname")}
                        className={`${s.input} ${errors.surname ? s.inputError : ""}`}
                        placeholder="Placeholder"
                    />
                    {errors.surname && (
                        <span className={s.errorText}>{errors.surname.message}</span>
                    )}
                </div>

                <div className={s.actions}>
                    <Button type="button" variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </div>
            </div>
        </Modal>
    )
}