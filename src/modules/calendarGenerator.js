import { setDay, setDate, getDate, isSameDay, format, formatISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import addEventPopup from './eventPopup.js';

const daysOfTheWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

// Create element with class
const createElemWithClass = (elementTagName, className) => {
  const newElement = (document.createElement(elementTagName));
  newElement.setAttribute('class', className);
  return newElement;
};

// Create cell structure
const createTaskCell = (inputDate, dayOfTheWeek = null) => {
  const cellDate = getDate(inputDate);
  const currentDate = Date.now();
  // Cell elements construct
  const cellBody = createElemWithClass('td', 'calendar__cell');
  const dataDate = formatISO(inputDate, { representation: 'date' });
  cellBody.setAttribute('data-date', dataDate);
  const cellTaskBody = createElemWithClass('div', 'calendar__cell_task_body');
  const cellHeader = createElemWithClass('div', 'calendar__cell_header');
  // dayOfTheWeek === null ? cellHeader.textContent = cellDate : cellHeader.textContent = `${dayOfTheWeek}, ${cellDate}`;
  if (dayOfTheWeek === null) {
    cellHeader.textContent = cellDate;
  } else {
    cellHeader.textContent = `${dayOfTheWeek}, ${cellDate}`;
  }
  const cellTaskHeader = createElemWithClass('div', 'calendar__task_header');
  const cellTaskIssue = createElemWithClass('div', 'calendar__task_issue');

  // Current day mark style
  if (isSameDay(currentDate, inputDate)) {
    cellBody.classList.add('calendar__cell_active');
  }

  if (localStorage.getItem(dataDate) !== null) {
    const data = JSON.parse(localStorage.getItem(dataDate));
    cellBody.classList.add('calendar__cell_marked');
    cellTaskHeader.textContent = data.taskName;
    cellTaskIssue.textContent = data.taskMembers;
  }

  cellTaskBody.appendChild(cellTaskHeader);
  cellTaskBody.appendChild(cellTaskIssue);
  cellBody.appendChild(cellHeader);
  cellBody.appendChild(cellTaskBody);

  // Popup event listener for each cell
  cellBody.addEventListener('click', () => {
    cellBody.classList.add('calendar__cell_formating');
    addEventPopup(dataDate);
    const formDateArea = document.getElementsByClassName('task_adjunction_popup__task_date')[0];
    // Input form style
    const localizedDate = format(inputDate, 'd, MMMM, yyyy', { locale: ru }); // #1
    // const localizedDate = format(inputDate, 'd MMMM yyyy', { locale: ru }) // #2

    formDateArea.setAttribute('value', localizedDate);
  });

  return cellBody;
};

const generateCalendar = (date = Date.now(), elementId = 'calendar') => {
  const tableRows = 5;
  const targetContainer = document.getElementById(elementId);
  targetContainer.innerHTML = '';
  const calendar = document.createElement('table');
  calendar.setAttribute('class', 'calendar__calendar_table');
  const calendarBody = document.createElement('tbody');
  calendarBody.setAttribute('class', 'calendar__calendar_body');

  const calendarFirstDate = setDay(setDate(date, 1), 1, { weekStartsOn: 0 });
  let currentDate = calendarFirstDate;

  for (let i = 0; i <= tableRows; i += 1) {
    const currentRow = document.createElement('tr');
    currentRow.setAttribute('class', 'calendar__row');
    let currentTaskCell;

    if (i > 0) {
      for (let currentDayOfWeek = 0; currentDayOfWeek < 7; currentDayOfWeek += 1) {
        currentTaskCell = createTaskCell(currentDate);
        currentRow.appendChild(currentTaskCell);
        currentDate = setDate(currentDate, getDate(currentDate) + 1);
      }
    } else {
      for (let currentDayOfWeek = 0; currentDayOfWeek < 7; currentDayOfWeek += 1) {
        currentTaskCell = createTaskCell(currentDate, daysOfTheWeek[currentDayOfWeek]);
        currentRow.appendChild(currentTaskCell);
        currentDate = setDate(currentDate, getDate(currentDate) + 1);
      }
    }
    calendarBody.appendChild(currentRow);
  }
  calendar.appendChild(calendarBody);

  targetContainer.appendChild(calendar);
};

export default generateCalendar;
