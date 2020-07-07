import { setDay, setDate, getDate, isSameDay } from 'date-fns';

const daysOfTheWeek = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

// Create element with class
const createElemWithClass = (elementTagName, className) => {
  const newElement = (document.createElement(elementTagName));
  newElement.setAttribute('class', className);
  return newElement;
}

// Create cell structure
const createTaskCell = (inputDate, dayOfTheWeek = null) => {
  const cellDate = getDate(inputDate);
  const currentDate = Date.now();
  // Cell elements construct
  const cellBody = createElemWithClass('td', 'calendar__cell');
  const cellTaskBody = createElemWithClass('div', 'calendar__cell_task_body');
  const cellHeader = createElemWithClass('div', 'calendar__cell_header');
  dayOfTheWeek === null ? cellHeader.textContent = cellDate : cellHeader.textContent = `${dayOfTheWeek}, ${cellDate}`; 
  const cellTaskHeader= createElemWithClass('div', 'calendar__task_header');
  const cellTaskIssue= createElemWithClass('div', 'calendar__task_issue');

  // Current day mark style
  if(isSameDay(currentDate, inputDate)) {
    cellBody.classList.add('calendar__cell_active');
  }

  cellTaskBody.appendChild(cellTaskHeader);
  cellTaskBody.appendChild(cellTaskIssue);
  cellBody.appendChild(cellHeader);
  cellBody.appendChild(cellTaskBody)

  return cellBody;
};

const generateCalendar = (date, elementId = 'calendar') => {
  const tableRows = 5;
  const targetContainer = document.getElementById(elementId);
  const calendar = document.createElement('table');
  calendar.setAttribute('class', 'calendar__calendar_table');
  const calendarBody = document.createElement('tbody');
  calendarBody.setAttribute('class', 'calendar__calendar_body');

  const calendarFirstDate = setDay(setDate(date, 1), 1, {weekStartsOn: 0});
  let currentDate = calendarFirstDate;
  
  for (let i = 0; i <= tableRows; i += 1) {
    const currentRow = document.createElement('tr');
    currentRow.setAttribute('class', 'calendar__row');
    let currentTaskCell;

    if (i > 0 ) {
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
}

export default generateCalendar;

