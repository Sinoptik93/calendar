import generateCalendar from './modules/calendarGenerator.js';

const currentDate = new Date(Date.now());

console.log('Current Date')
console.group();
console.log(currentDate);
console.groupEnd();

generateCalendar(currentDate);
