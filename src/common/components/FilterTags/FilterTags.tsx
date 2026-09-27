import { useState } from "react"
import s from "./FilterTags.module.css"

interface FilterTagsProps {
    tags: string[]
    onFilterChange?: (activeTags: string[]) => void
}

export const FilterTags = ({ tags, onFilterChange }: FilterTagsProps) => {
    const [activeTags, setActiveTags] = useState<string[]>([])

    const toggleTag = (tag: string) => {
        const newActiveTags = activeTags.includes(tag)
            ? activeTags.filter(t => t !== tag)
            : [...activeTags, tag]

        setActiveTags(newActiveTags)
        onFilterChange?.(newActiveTags)
    }

    return (
        <div className={s.container}>
            {tags.map(tag => (
                <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`${s.tag} ${activeTags.includes(tag) ? s.active : ""}`}
                >
                    {tag}
                </button>
            ))}
        </div>
    )
}