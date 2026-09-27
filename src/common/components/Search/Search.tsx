import {Search as SearchIcon} from "lucide-react"
import {type ChangeEvent} from "react";
import s from "./Search.module.css"

interface SearchAndSortProps {
    placeholder: string,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({onSearchChange,placeholder}: SearchAndSortProps) => {

    return (
        <div className={s.searchWrapper}>
            <SearchIcon size={20} className={s.searchIcon}/>
            <input type="search" placeholder={placeholder}
                   onChange={e => onSearchChange(e)}
                   className={s.searchInput}
            />
        </div>
    )
}