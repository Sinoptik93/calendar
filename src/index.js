import generateCalendar from './modules/calendarGenerator.js';

const monthsOfTheYear = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const currentMonth = new Date(Date.now()).getMonth()
console.log(monthsOfTheYear[currentMonth])

generateCalendar(currentMonth);
