import { getMonth, getYear, setMonth } from 'date-fns';
import generateCalendar from './calendarGenerator.js';

// Navigation buttons elements
const previousMonthButton = document.querySelector('.navigation__prev_month_button');
const nextMonthButton = document.querySelector('.navigation__next_month_button');
const currentDayButton = document.querySelector('.navigation__current_day_button');

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
  'Декабрь',
];

const renderCalendar = (date = Date.now()) => {
  const navigationArea = document.querySelector('.navigation__current_month');
  const calendarArea = document.querySelector('.calendar__calendar_table');
  const targetMonth = getMonth(date);
  const targetYear = getYear(date);

  navigationArea.textContent = `${monthsOfTheYear[targetMonth]} ${targetYear}`;

  if (calendarArea !== null) {
    calendarArea.remove();
  }
  generateCalendar(date);
};

// Navigation buttons event listener
previousMonthButton.addEventListener('click', () => {
  targetDate = setMonth(targetDate, (getMonth(targetDate) - 1));
  renderCalendar(targetDate);
});

nextMonthButton.addEventListener('click', () => {
  targetDate = setMonth(targetDate, (getMonth(targetDate) + 1));
  renderCalendar(targetDate);
});

currentDayButton.addEventListener('click', () => {
  renderCalendar();
});

export default renderCalendar;
