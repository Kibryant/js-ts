export function isValidScheduleDate(scheduleDate?: Date): boolean {
    if (!scheduleDate) {
        return true;
    }

    const now = new Date();
    return scheduleDate >= now;
}
