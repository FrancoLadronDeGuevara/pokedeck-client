export const formatDate = (dateToFormat) => {
    const newFormatDate = new Date(dateToFormat).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return newFormatDate;
}

export const formatLastSpinTime = (lastSpinTime) => {
    const lastSpinDate = new Date(lastSpinTime);
    const now = new Date();

    const diffMilliseconds = Math.abs(now - lastSpinDate);
    const diffSeconds = Math.floor(diffMilliseconds / 1000);

    const totalSecondsRemaining = (3 * 60 * 60) - diffSeconds; 
    const totalHours = Math.floor(totalSecondsRemaining / 3600);
    const totalMinutes = Math.floor((totalSecondsRemaining % 3600) / 60);
    const totalSeconds = totalSecondsRemaining % 60;

    if (totalSecondsRemaining <= 0) {
        return "¡Ahora!";
    } else {
        const formattedHours = totalHours < 10 ? '0' + totalHours : totalHours;
        const formattedMinutes = totalMinutes < 10 ? '0' + totalMinutes : totalMinutes;
        const formattedSeconds = totalSeconds < 10 ? '0' + totalSeconds : totalSeconds;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
};