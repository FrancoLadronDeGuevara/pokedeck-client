export default function formatDate(dateToFormat) {
    const newFormatDate = new Date(dateToFormat).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return newFormatDate;
}