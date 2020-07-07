import { getMonth, getYear, setMonth } from 'date-fns';
import generateCalendar from './calendarGenerator.js'

// Navigation buttons elements
const previousMonthButton = document.getElementsByClassName('navigation__prev_month_button')[0];
const nextMonthButton = document.getElementsByClassName('navigation__next_month_button')[0];
const currentDayButton = document.getElementsByClassName('navigation__current_day_button')[0];

const currentDate = new Date(Date.now());
let targetDate = currentDate;

const monthsOfTheYear = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

const renderCalendar = (date = Date.now()) => {
  const navigationArea = document.getElementsByClassName('navigation__current_month')[0];
  const calendarArea = document.getElementsByClassName('calendar__calendar_table')[0];
  const targetMonth = getMonth(date);
  const targetYear = getYear(date);

  navigationArea.textContent =`${monthsOfTheYear[targetMonth]} ${targetYear}`;

  if (calendarArea !== undefined) {
    calendarArea.remove();
  }
  
  generateCalendar(date);
}

// Navigation buttons event listener
previousMonthButton.addEventListener('click', () => {
  targetDate = setMonth(targetDate, (getMonth(targetDate) - 1));
  renderCalendar(targetDate);
})

nextMonthButton.addEventListener('click', () => {
  targetDate = setMonth(targetDate, (getMonth(targetDate) + 1));
  renderCalendar(targetDate);
})

currentDayButton.addEventListener('click', () => {
  renderCalendar();
})

export default renderCalendar;