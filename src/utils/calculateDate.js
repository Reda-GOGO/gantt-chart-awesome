export function getWeeksBetween(start, end) {
    // Ensure startDate is before endDate
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (startDate > endDate) {
        [startDate, endDate] = [endDate, startDate];
    }

    const millisecondsInDay = 24 * 60 * 60 * 1000;

    // Get the day of the week for start and end dates (0 for Sunday)
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();

    // Adjust start date to the previous Monday
    let adjustedStartDate;
    if (startDay <= 0) {
        adjustedStartDate = new Date(startDate.getTime() - (((6 - startDay)) * millisecondsInDay));
    } else {
        adjustedStartDate = new Date(startDate.getTime() - (((startDay - 1)) * millisecondsInDay));

    }

    // Adjust end date to the next Snndays relative to the end date's week
    let adjustedEndDate;
    if (endDay > 0) {
        adjustedEndDate = new Date(endDate.getTime() + ((8 - endDay) * millisecondsInDay));
    } else {
        adjustedEndDate = new Date(endDate.getTime() + ((endDay + 1) * millisecondsInDay));
    }

    // Calculate the difference in days between adjusted dates
    const differenceInDays = Math.ceil((adjustedEndDate - adjustedStartDate) / millisecondsInDay);

    // Calculate total weeks (including partial weeks)
    const totalWeeks = Math.ceil(differenceInDays / 7);

    const weeks = [];
    let currentWeekStart = adjustedStartDate;
    for (let i = 0; i < totalWeeks; i++) {
        const nextWeekStart = new Date(currentWeekStart.getTime() + 7 * millisecondsInDay);
        const nextWeekEnd = new Date(currentWeekStart.getTime() + 6 * millisecondsInDay);

        // Limit the end date to endDate if it goes beyond

        // Check if weekEnd is a Date object before using toLocaleDateString
        weeks.push({
            weekNumber: i + 1,
            startDate: currentWeekStart.toLocaleDateString(),
            endDate: nextWeekEnd.toLocaleDateString(),
        });
        currentWeekStart = nextWeekStart;
    }
    let DateIterator = new Date(weeks[0].startDate);
    let info = [];
    while (DateIterator < new Date(weeks[weeks.length - 1].endDate)) {
        let currentYear = DateIterator.getFullYear();
        let currentMonth = DateIterator.getMonth();
        let countDays = 1;
        let nextIterator = new Date(currentYear, currentMonth + 1, 1);
        if (nextIterator > new Date(weeks[weeks.length - 1].endDate)) {
            nextIterator = new Date(weeks[weeks.length - 1].endDate);
        }
        countDays = Math.ceil((nextIterator - DateIterator) / millisecondsInDay);
        info.push({ month: currentMonth, days: countDays ,year : currentYear });
        DateIterator.setDate(DateIterator.getDate() + countDays);

    }
    return {
        totalWeeks,
        weeks,
        Monthsinfo : info,
        totalMonths : info.length
    };
}



export function getMonthsBetweenDates(date1Str, date2Str) {
    const dates = [];  // Array to store year-month objects
  
    // Create Date objects for date1 and date2
    const date1 = new Date(date1Str);
    date1.setMonth(date1.getMonth() - 1)
    const date2 = new Date(date2Str);
  
    // Ensure date1 is before date2 for clarity (optional)
    if (date1 > date2) {
      [date1, date2] = [date2, date1];  // Swap dates if needed
    }
    let totalMonth = 0 ;
    // Loop through years between date1 and date2 (inclusive)
    for (let year = date1.getFullYear(); year <= date2.getFullYear(); year++) {
      // Get the starting and ending months (0-based) for the current year
      const startMonth = year === date1.getFullYear() ? date1.getMonth() : 0;
      const endMonth = year === date2.getFullYear() ? date2.getMonth() : 11;
        totalMonth += createMonthArray(startMonth,endMonth).length;
      // Create an object for the current year and its months
      dates.push({ year, month: createMonthArray(startMonth, endMonth) });
    
    }
  
    return {
        dates,
        totalMonth,
        totalYear : dates.length
    };
  }
  
  // Helper function to create an array of months within a range
  function createMonthArray(startMonth, endMonth) {
    const months = [];
    for (let month = startMonth; month <= endMonth; month++) {
      // Add month index + 1 (1-based indexing for months)
      months.push(month + 1);
    }
    return months;
  }


export function getDaysBetweenDates(start,end,actualStart,actualEnd){
    const date1 = new Date(start);
    const date2 = new Date(end);
    const millisecondsInDay = 24 * 60 * 60 * 1000;

    const startDay = new Date(actualStart.getTime() - (1 * millisecondsInDay));
    const endDay = new Date(actualEnd);
    const days = [];
    const actualDays = [];
    let currentStartDay = date1;
    while(currentStartDay <= date2 ){
        days.push(currentStartDay.getDate())
        if(currentStartDay >= startDay && currentStartDay <= endDay){
            actualDays.push(currentStartDay.toLocaleDateString());
        }
        currentStartDay.setDate(currentStartDay.getDate()+1);
    }

    return {
        days,
        totalDays : days.length,
        actualDays,
    }
  }

export function calculateDaysBetweenDates(start,end){
    const date1 = new Date(start);
    const date2 = new Date(end);
    let currentDay = date1 ;
    let daysCount = 0 ;
    while(currentDay <= date2){
        daysCount++;
        currentDay.setDate(currentDay.getDate()+1);
    }
    return daysCount ;
}