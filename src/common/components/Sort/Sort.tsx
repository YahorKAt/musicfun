import {ChevronDown} from "lucide-react";
import {useState} from "react";
import s from './Sort.module.css'


type SortOption = "oldest" | "popular" | "newest"


interface SortProps {
    sortBy: SortOption
    onSortChange: (sort: SortOption) => void
}

export const Sort = ({sortBy, onSortChange,}: SortProps) => {
    const [isSortOpen, setIsSortOpen] = useState(false)

    const sortOptions: { value: SortOption; label: string }[] = [
        {value: "newest", label: "Newest first"},
        {value: "oldest", label: "Sort by oldest first"},
        {value: "popular", label: "Sort by top-rated first"},
    ]

    const currentSortLabel = sortOptions.find((opt) => opt.value === sortBy)?.label || "Newest first"

    return (
        <div className={s.sortWrapper}>
            <span className={s.sortLabel}>Sort By</span>
            <div className={s.sortSelect}>
                <button type="button" className={s.sortButton} onClick={() => setIsSortOpen(!isSortOpen)}>
                    {currentSortLabel}
                    <ChevronDown size={16} className={s.sortArrow}/>
                </button>

                {isSortOpen && (
                    <div className={s.sortDropdown}>
                        {sortOptions.map((option) => (
                            <button key={option.value} type="button"
                                    className={`${s.sortOption} ${option.value === sortBy ? s.sortOptionActive : ""}`}
                                    onClick={() => {
                                        onSortChange(option.value)
                                        setIsSortOpen(false)
                                    }}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

