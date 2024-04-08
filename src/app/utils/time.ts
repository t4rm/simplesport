export function convertMinutesToTimeString(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
}