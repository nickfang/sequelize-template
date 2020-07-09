const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// TODO: needs to be refactored and made more efficient  maybe memoize or figure out an equation
function parseDate(dateStr, startDay = 0) {
  const dateObj = new Date(dateStr);
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth();
  // console.log({ year, month, dateStr });
  const dateItr = new Date(`${year}-01-01`);
  // adjust for selected start day of the week
  const offset = dateItr.getUTCDay() - startDay;
  const adjustedOffset = offset < 0 ? offset + 7 : offset;
  dateItr.setUTCDate(1 - adjustedOffset);

  const weeks = [];
  while (dateItr.toISOString().split('T')[0] <= dateStr) {
    weeks.push(dateItr.toISOString().split('T')[0]);
    dateItr.setUTCDate(dateItr.getUTCDate() + 7);
  }
  const weekNumber = weeks.length;
  return { year, month, weekNumber };
}

// might be better to validate through sequelize.
function validDateString(dateStr) {
  const regex = /(([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  const found = dateStr.match(regex);
  if (found) {
    return {
      year: found[2],
      month: found[3],
      day: found[4],
    };
  }
  return false;
}

const toDateString = date => {
  const format2Digit = int => (`0${int}`).slice(-2);
  const year = date.getFullYear();
  const month = format2Digit(date.getMonth() + 1);
  const day = format2Digit(date.getDate());
  const displayDate = `${year}-${month}-${day}`;
  return displayDate;
};

module.exports = {
  MONTHS,
  parseDate,
  validDateString,
  toDateString,
};

// const currentDate = new Date();
// console.log(formatForInput(currentDate));
// console.log(getWeekBoundary(currentDate));
// console.log(getNumWeeksPerMonth(currentDate));
// console.log(getWeekBoundariesPerMonth(currentDate));
// console.log(getWeekDates(1, 2020));
// console.log(parseDate('2020-12-26', 0));


// function formatForInput(date) {
//   // console.log(inputDate)
//   // const date = new Date(inputDate);
//   const format2Digit = int => ('0' + int).slice(-2);
//   const displayDate = `${date.getFullYear()}-${format2Digit(date.getMonth() + 1)}-${format2Digit(date.getDate())}`;
//   return displayDate;
// }

// // return the start of the week and the end of the week.
// // by default the start day is a Monday
// function getWeekBoundary(date, startDay = 1) {
//   start = date.getDate() - (7 + date.getDay() - startDay) % 7;
//   const weekStart = new Date(date.setDate(start));
//   const weekEnd = new Date(date.setDate(start + 7));
//   return { weekStart, weekEnd };
// }

// function getNumWeeksPerMonth(date) {
//   if (date.getUTCDay() !== 1) date.setUTCDate(1);
//   const start = date.getUTCDay();
//   const totalDays = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getUTCDate();
//   const numWeeks = Math.ceil((start + totalDays) / 7);

//   return { numWeeks };
// }

// /** 
//  * Returns the start and end dates for every week in a month.  The week range = [i, i+1).  
//  * @param {Date} date - Created new Date can be any day of the month.
//  */
// function getWeekBoundariesPerMonth(date) {
//     date.setUTCDate(1);
//     const startOffset = date.getUTCDay();
//     date.setUTCMonth(date.getUTCMonth() + 1)
//     date.setUTCDate(0);
//     const totalDays = date.getUTCDate();
//     const numWeeks = Math.ceil((startOffset + totalDays) / 7);
//     date.setUTCDate(1 - startOffset);
//     startDates = [date.toISOString().split('T')[0]];
//     for (let i = 0; i < numWeeks; i++) {
//       date.setUTCDate(date.getUTCDate() + 7)
//       startDates.push(date.toISOString().split('T')[0])
//     }
//     console.log(startOffset, totalDays, startDates)
//     return { startDates, numWeeks, totalDays, startOffset };
// }

// function getWeekDates(month, year, startDay = 0) {
//   const date = new Date(year, month, 1);
//   const offset = date.getUTCDay() - startDay;
//   // if the offset is negative we are starting after the first of the month.  Make offset a week earlier.
//   const adjustedOffset = offset < 0 ? offset + 7 : offset;
//   date.setUTCDate(1 - adjustedOffset);
//   const weekDates = []
//   while (date.getUTCMonth() <= month) {
//     weekDates.push(date.toISOString().split('T')[0]);
//     date.setUTCDate(date.getUTCDate() + 7);
//   }
//   const numWeeks = weekDates.length - 1;
//   return { weekDates, numWeeks };
// }
