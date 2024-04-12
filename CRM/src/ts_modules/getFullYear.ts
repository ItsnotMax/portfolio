export function getYear(receivedDate: string) {
    const date = new Date(receivedDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    return `${formattedMonth}.${formattedDay}.${date.getFullYear()}`;
}