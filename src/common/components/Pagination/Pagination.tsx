import {getPaginationPages} from "@/common/utils";
import s from './Pagination.module.css'

type Props = {
    currentPage: number
    setCurrentPage: (page: number) => void
    pagesCount: number
    pageSize: number
    changePageSize: (size: number) => void
}

export const Pagination = ({currentPage, setCurrentPage, pagesCount, pageSize, changePageSize}: Props) => {
    if (pagesCount <= 1) return null

    const pages = getPaginationPages(currentPage, pagesCount)

    return (
        <div className={s.container}>
            <div className={s.pagination}>
                {pages.map((page, idx) => page === '...'
                    ? (<span className={s.ellipsis} key={`ellipsis-${idx}`}>...</span>)
                    : (<button key={page} type="button" disabled={page === currentPage}
                               onClick={() => page !== currentPage && setCurrentPage(Number(page))}
                               className={page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>
            <label>
                Show&ensp;
                <select value={pageSize} onChange={e => changePageSize(Number(e.target.value))}>
                    {[2, 4, 8, 16, 32].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                &ensp;per page
            </label>

        </div>

    )
}