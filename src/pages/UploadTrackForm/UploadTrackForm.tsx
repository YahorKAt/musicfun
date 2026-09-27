import {Button} from "@/common/components";
import {Modal} from "@/common/components/Modal/Modal";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectIsOpenUploadTrackModalAC, setIsOpenUploadTrackModalAC} from "@/features/tacks/model";
import {Music, X} from "lucide-react";
import * as React from "react";
import {useRef, useState} from "react";
import s from './UploadTrackForm.module.css'

export const UploadTrackForm = () => {
    const isOpen = useAppSelector(selectIsOpenUploadTrackModalAC)
    const dispatch = useAppDispatch();

    // const [uploadTrack, { isLoading }] = useUploadTrackMutation()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)


    // Загрузка трека
    const handleTrackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"]
        if (!allowedTypes.includes(file.type)) {
            alert("Only MP3, WAV or OGG files are allowed!")
            return
        }

        const maxSize = 50 * 1024 * 1024 // 50MB
        if (file.size > maxSize) {
            alert("Max file size is 50MB!")
            return
        }

        setSelectedFile(file)
    }

    const removeTrack = () => {
        setSelectedFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedFile) {
            alert("Please select a track first!")
            return
        }

        try {
            // const formData = new FormData()
            // formData.append("file", selectedFile)
            // Добавь другие поля если нужно (title, artist и т.д.)

            // await uploadTrack(formData).unwrap()

            setSelectedFile(null)
            dispatch(setIsOpenUploadTrackModalAC({isOpen: false}))
        } catch (error) {
            console.error("Failed to upload track:", error)
        }
    }
    const handleClose = () => {
        setSelectedFile(null)
        dispatch(setIsOpenUploadTrackModalAC({isOpen: false}))
    }


    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Upload Track">
            <form onSubmit={onSubmit} className={s.form}>
                {/* Загрузка трэка */}
                <div className={s.uploadSection}>
                    <input ref={fileInputRef} type="file"
                           accept="audio/mpeg,audio/wav,audio/ogg,audio/mp3"
                           onChange={handleTrackChange}
                           className={s.hiddenInput}
                           id="track-upload"/>

                    {selectedFile ? (
                        <div className={s.fileSelected}>
                            <div className={s.fileInfo}>
                                <Music size={32} className={s.fileIcon}/>
                                <div className={s.fileDetails}>
                                    <span className={s.fileName}>{selectedFile.name}</span>
                                    <span
                                        className={s.fileSize}>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                                </div>
                            </div>
                            <button type="button" className={s.removeFileBtn} onClick={removeTrack}>
                                <X size={20}/>
                            </button>
                        </div>
                    ) : (
                        <label htmlFor="track-upload" className={s.uploadButton}>
                            <Music size={24}/>
                            <span>Choose Track</span>
                        </label>
                    )}
                </div>

                {/* Кнопки */}
                <div className={s.actions}>
                    <Button type="button" variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </div>
            </form>
        </Modal>
    )
}

