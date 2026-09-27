export const formatDateRelative = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)
    const diffWeek = Math.floor(diffDay / 7)
    const diffMonth = Math.floor(diffDay / 30)

    // Менее минуты
    if (diffSec < 60) {
        return "just now"
    }

    // Менее часа
    if (diffMin < 60) {
        return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`
    }

    // Менее суток
    if (diffHour < 24) {
        return `${diffHour} ${diffHour === 1 ? "hour" : "hours"} ago`
    }

    // Менее недели
    if (diffDay < 7) {
        return `${diffDay} ${diffDay === 1 ? "day" : "days"} ago`
    }

    // Менее месяца
    if (diffWeek < 4) {
        return `${diffWeek} ${diffWeek === 1 ? "week" : "weeks"} ago`
    }

    // Менее 2 месяцев — показываем "month ago" как на макете
    if (diffMonth < 2) {
        return "month ago"
    }

    // Менее года — показываем количество месяцев
    if (diffMonth < 12) {
        return `${diffMonth} months ago`
    }

    // Старые даты — формат DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}