import {getPaginationPages} from "@/common/utils";
import {ChevronLeft, ChevronRight} from "lucide-react";
import s from './Pagination.module.css'

type Props = {
    currentPage: number
    setCurrentPage: (page: number) => void
    pagesCount: number
    pageSize: number
    changePageSize?: (size: number) => void
}

export const Pagination = ({currentPage, setCurrentPage, pagesCount, pageSize, changePageSize}: Props) => {
    if (pagesCount <= 1) return null

    const pages = getPaginationPages(currentPage, pagesCount)

    const goToPrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const goToNext = () => {
        if (currentPage < pagesCount) setCurrentPage(currentPage + 1)
    }

    return (
        <div className={s.container}>
            <div className={s.pagination}>
                {/* Кнопка "Назад" */}
                <button type="button" className={s.navButton} aria-label="Previous page"
                        onClick={goToPrev} disabled={currentPage === 1}>
                    <ChevronLeft size={20}/>
                </button>

                {/* Страницы */}
                {pages.map((page, idx) =>
                    page === '...'
                        ? (<span className={s.ellipsis} key={`ellipsis-${idx}`}>...</span>)
                        : (<button key={page} type="button" disabled={page === currentPage}
                                   onClick={() => page !== currentPage && setCurrentPage(Number(page))}
                                   className={page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton}
                            >
                                {page}
                            </button>
                        )
                )}

                {/* Кнопка "Вперёд" */}
                <button type="button" className={s.navButton} aria-label="Next page"
                        onClick={goToNext} disabled={currentPage === pagesCount}>
                    <ChevronRight size={20}/>
                </button>
            </div>

            {/* Селект размера страницы */}
            {changePageSize && (<label className={s.pageSizeLabel}>
                Show&ensp;
                <select className={s.pageSizeSelect} value={pageSize}
                        onChange={e => changePageSize(Number(e.target.value))}>
                    {[2, 4, 8, 16, 32].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                &ensp;per page
            </label>)}

        </div>

    )
}