import {Button} from "@/common/components";
import {Modal} from "@/common/components/Modal/Modal";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {useCreatePlaylistMutation} from "@/features/playlists/api/playlistsApi";
import type {CreatePlaylistAttributes, CreatePlaylistRequest} from "@/features/playlists/api/playlistsApi.types";
import {createPlaylistSchema} from "@/features/playlists/model";
import {selectIsOpenModal, setIsOpenModalAC} from "@/features/playlists/model/playlist-slice";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChevronDown, ImagePlus, X} from "lucide-react";
import * as React from "react";
import {useRef, useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import s from './CreatePlaylistForm.module.css'

export const CreatePlaylistForm = () => {
    const isOpen = useAppSelector(selectIsOpenModal)
    const dispatch = useAppDispatch();

    const [createPlaylist, {isLoading}] = useCreatePlaylistMutation()

    const {register, handleSubmit, reset, formState: {errors},} = useForm<CreatePlaylistAttributes>({
        resolver: zodResolver(createPlaylistSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })


    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState("")

    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [coverPreview, setCoverPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    if (!isOpen) return null

    // Добавление тега по Enter
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            const value = tagInput.trim()
            if (value && !tags.includes(value)) {
                setTags([...tags, value])
                setTagInput("")
            }
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove))
    }

    // Загрузка обложки
    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
        if (!allowedTypes.includes(file.type)) {
            alert("Only JPEG, PNG or GIF are allowed!")
            return
        }

        setCoverFile(file)
        setCoverPreview(URL.createObjectURL(file))
    }

    const removeCover = () => {
        setCoverFile(null)
        setCoverPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const onSubmit: SubmitHandler<CreatePlaylistAttributes> = async (formData) => {
        const payload: CreatePlaylistRequest = {
            data: {
                type: "playlists",
                attributes: {
                    title: formData.title,
                    description: formData.description,
                }
            }
        };

        try {
            await createPlaylist(payload).unwrap()
            reset()
            setTags([])
            removeCover()
            dispatch(setIsOpenModalAC({isOpen: false}))
        } catch (error) {
            console.error("Failed to create playlist:", error)
        }
    }

    const handleClose = () => {
        reset()
        setTags([])
        setTagInput("")
        removeCover()
        dispatch(setIsOpenModalAC({isOpen: false}))
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Create Playlist">
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                {/* Загрузка обложки */}
                <div className={s.coverSection}>
                    <div className={s.coverPreview} onClick={() => fileInputRef.current?.click()}>
                        {coverPreview
                            ? <>
                                <img src={coverPreview} alt="Cover preview" className={s.coverImage}/>
                                <button type="button" className={s.removeCoverBtn}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeCover()
                                        }}>
                                    <X size={20}/>
                                </button>
                            </>
                            : <ImagePlus size={48} className={s.coverIcon}/>
                        }
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/gif"
                           onChange={handleCoverChange} className={s.hiddenInput}/>
                    <button type="button" className={s.uploadBtn}
                            onClick={() => fileInputRef.current?.click()}>
                        Upload Cover Image
                    </button>
                </div>

                {/* Title */}
                <div className={s.field}>
                    <label className={s.label}>Title</label>
                    <input className={`${s.input} ${errors.title ? s.inputError : ""}`}
                           {...register("title")} placeholder="Placeholder"/>
                    {errors.title && <span className={s.errorText}>{errors.title.message}</span>}
                </div>

                {/* Description */}
                <div className={s.field}>
                    <label className={s.label}>Description</label>
                    <textarea className={s.textarea} placeholder="Placeholder" rows={3}
                              {...register("description")}/>
                </div>

                {/* Hashtags */}
                <div className={s.field}>
                    <label className={s.label}>Hashtags</label>
                    <div className={s.tagsWrapper}>
                        <div className={s.tagsList}>
                            {tags.map(tag => (
                                <span key={tag} className={s.tag}>
                                    #{tag}
                                    <button type="button" className={s.tagRemove} onClick={() => removeTag(tag)}>
                                        <X size={12}/>
                                    </button>
                                </span>
                            ))}
                            <input type="text" value={tagInput}
                                   onChange={(e) => setTagInput(e.target.value)}
                                   onKeyDown={handleTagKeyDown}
                                   placeholder={tags.length === 0 ? "Add tag and press Enter" : ""}
                                   className={s.tagInput}/>
                        </div>
                        <ChevronDown size={16} className={s.dropdownIcon}/>
                    </div>
                </div>

                {/* Кнопки */}
                <div className={s.actions}>
                    <Button type="button" variant={'secondary'} className={s.cancelBtn} onClick={handleClose}
                            disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" className={s.saveBtn} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

