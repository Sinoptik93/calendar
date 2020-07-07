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

const daysOfTheWeek = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

{/* <td class="calendar__cell">
  <div class="calendar__cell_header">6</div>
  <div class="calendar__cell_task_body"></div>
</td> */}

const createElement = (elementTagName, className) => {
  const newElement = (document.createElement(elementTagName));
  newElement.setAttribute('class', className);
  return newElement;
}

const createTaskCell = (day) => {
  const cellBody = createElement('td', 'calendar__cell');
  const cellHeader = createElement('div', 'calendar__cell_header');
  cellHeader.textContent = day;
  const cellTaskBody = createElement('div', 'calendar__cell_task_body');

  cellBody.appendChild(cellHeader);
  cellBody.appendChild(cellTaskBody);

  return cellBody;
};

const generateCalendar = (date) => {
  const currentMonth = date.getMonth();
  console.log(currentMonth)
  const currentWeekDay = date.getDay();
  console.log(currentWeekDay);
  const currentDay = date.getDate();
  console.log(currentDay);

  const daysInMonth = date.setMonth((date.getMonth() + 1));
  daysInMonth.setDate()
  
  console.log('generateCalendar')
  console.group();
  console.log(daysInMonth);
  console.groupEnd();

}

export default generateCalendar;

