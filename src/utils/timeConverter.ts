export const timeConverter = (seconds: number): string => {
    const second = String(seconds % 60).padStart(2, '0');
    const minute = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const hour = String(Math.floor(seconds / 3600)).padStart(2, '0');

    return `${hour}:${minute}:${second}`
}