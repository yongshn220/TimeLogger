
/* --------------
    CONSTANTS
 ---------------*/
import Color from "./Color";

export const Mode = {
    DAY: "dayMode",
    WEEK: "weekMode",
    MONTH: "monthMode",
    YEAR: "yearMode",
}

export const TEXT_COLOR = "white";

const MarkedDateGroup = {
    SINGLE: {startingDay: true, endingDay: true, color: Color.LightBlue, textColor: TEXT_COLOR},
    START: {startingDay: true,  color: Color.LightBlue, textColor: TEXT_COLOR},
    INNER: {color: Color.LightBlue, textColor: TEXT_COLOR},
    END: {endingDay: true, color: Color.LightBlue, textColor: TEXT_COLOR},
}


/* --------
    DATE
 ---------*/
export function getDateNowString() {
    let date = new Date(Date.now());
    return getLocaleDateString(date);
}

function getLocaleDateString(date) {

// Manually format the date as "yyyy-mm-dd"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

// Concatenate the components in "yyyy-mm-dd" format
    return `${year}-${month}-${day}`;
}

/* ------------
    CALENDAR
 --------------*/
export function getCalendarPeriod(startDay, endDay) {
    const startDate = new Date(startDay);
    const endDate = new Date(endDay);
    const daysObject = {};

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateString = getLocaleDateString(date);

        if (startDate.getTime() === endDate.getTime())      daysObject[dateString] = MarkedDateGroup.SINGLE;
        else if (date.getTime() === startDate.getTime())    daysObject[dateString] = MarkedDateGroup.START;
        else if (date.getTime() === endDate.getTime())      daysObject[dateString] = MarkedDateGroup.END;
        else                                                daysObject[dateString] = MarkedDateGroup.INNER;
    }
    return daysObject;
}

export function getDayStringsBetween(startDay, endDay) {
    const startDate = new Date(startDay);
    const endDate = new Date(endDay);
    let result = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateString = getLocaleDateString(date);
        result.push(dateString);
    }
    return result;
}

export function getStartEndDay(mode, dayString) {
    if (mode === Mode.DAY) {
        return getDayStartEndDayString(dayString);
    }
    if (mode === Mode.WEEK) {
        return getWeekStartEndDayString(dayString);
    }
    if (mode === Mode.MONTH) {
        return getMonthStartEndDayString(dayString);
    }
}

export function getDayStartEndDayString(dayString) {
    return toStartEndDayStringJson(dayString, dayString);
}

export function getWeekStartEndDayString(dayString) {
    const date = new Date(dayString);
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate the startDay (Sunday) of the week that contains the input date
    let startDay = new Date(date);
    startDay.setDate(date.getDate() - dayOfWeek);
    startDay = getLocaleDateString(startDay);

    // Calculate the endDay (Saturday) of the week that contains the input date
    let endDay = new Date(date);
    endDay.setDate(date.getDate() + (6 - dayOfWeek));
    endDay = getLocaleDateString(endDay);

    return toStartEndDayStringJson(startDay, endDay);
}

export function getMonthStartEndDayString(dayString) {
    const date = new Date(dayString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    let startDay = new Date(year, month - 1, 1)
    startDay = getLocaleDateString(startDay);

    let endDay = new Date(year, month, 0)
    endDay = getLocaleDateString(endDay);

    return toStartEndDayStringJson(startDay, endDay);
}

function toStartEndDayStringJson(startDayString, endDayString) {
    return {
        startDayString: startDayString,
        endDayString: endDayString,
    }
}

export function toSimpleDurationString(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startYear = start.getFullYear();
    const startMonth = start.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month number
    const startDay = start.getDate();

    const endYear = end.getFullYear();
    const endMonth = end.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month number
    const endDay = end.getDate();

    if (startYear === endYear && startMonth === endMonth && startDay === endDay) {
        return `${startYear} ${startMonth}.${startDay}`;
    }
    if (startYear === endYear) {
        return `${startYear} ${startMonth}.${startDay} ~ ${endMonth}.${endDay}`;
    }
    else {
        return `${startYear} ${startMonth}.${startDay} ~ ${endYear} ${endMonth}.${endDay}`;
    }
}

export function isDateStringInRange(targetDateStr, startDateStr, endDateStr) {
    const targetDate = new Date(targetDateStr);
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    return targetDate >= startDate && targetDate <= endDate;
}