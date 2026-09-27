import {useState, useRef, useEffect} from "react"
import {X, ChevronDown} from "lucide-react"
import s from "./TagsFilter.module.css"

interface TagsFilterProps {
    title: string
    selectedTags: string[]
    availableTags: string[]
    onTagsChange: (tags: string[]) => void
}

export const TagsFilter = ({title, selectedTags, availableTags, onTagsChange}: TagsFilterProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Закрытие дропдауна при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        if (isOpen) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter((t) => t !== tag))
        } else {
            onTagsChange([...selectedTags, tag])
        }
    }

    const removeTag = (tag: string) => {
        onTagsChange(selectedTags.filter((t) => t !== tag))
    }

    return (
        <div className={s.container} ref={containerRef}>

            <label className={s.label}>{title}</label>
            <div className={s.tagsWrapper}>
                <div className={s.tagsList}>
                    {/* Выводим ВСЕ выбранные теги, они будут переноситься */}
                    {selectedTags.map((tag) => (
                        <span key={tag} className={s.tag}>
                            #{tag}
                            <button type="button" className={s.tagRemove} onClick={() => removeTag(tag)}>
                                <X size={12}/>
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        className={s.tagInput}
                        placeholder={selectedTags.length === 0 ? "Add tag..." : ""}
                        onFocus={() => setIsOpen(true)}
                    />
                </div>

                <button type="button" className={s.dropdownToggle} onClick={() => setIsOpen(!isOpen)}>
                    <ChevronDown size={16} className={`${s.dropdownArrow} ${isOpen ? s.arrowOpen : ""}`} />
                </button>

                {isOpen && (
                    <div className={s.dropdown}>
                        {availableTags.map((tag) => {
                            const isSelected = selectedTags.includes(tag)
                            return (
                                <label key={tag} className={s.dropdownItem}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleTag(tag)}
                                        className={s.checkbox}
                                    />
                                    <span className={s.dropdownItemLabel}>#{tag}</span>
                                </label>
                            )
                        })}
                    </div>
                )}
            </div>

        </div>
    )
}