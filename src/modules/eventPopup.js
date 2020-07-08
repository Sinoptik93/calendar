import { parseISO, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import generateCalendar from './calendarGenerator.js';

const main = document.getElementsByClassName('calendar')[0];
const popupForm = document.createElement('div');
const popupHTML = `
  <div class="task_adjunction_popup">
    <div class="task_adjunction_popup__body">
      <div class="task_adjunction_popup__close_button">✕</div>
      <form action="" class="task_adjunction_popup__form_body">
        <input type="text" name="task_name" class="task_adjunction_popup__task_name" placeholder="Событие" required autofocus >
        <input type="text" name="date" class="task_adjunction_popup__task_date" placeholder="День, месяц, год" required>
        <input type="text" name="members" class="task_adjunction_popup__task_members" placeholder="Имена участников">
        <textarea rows="6" name="description" class="task_adjunction_popup__task_description" placeholder="Описание"></textarea>
        <div class="task_adjunction_popup__buttons_area">
          <button class="task__adjunction_popup__accept_button">Готово</button>
          <button class="task__adjunction_popup__delete_button">Удалить</button>
        </div>
      </form>
    </div>
  </div>
`;

const closeForm = (form) => {
  const formattingCell = document.getElementsByClassName('calendar__cell_formating')[0];
  formattingCell.classList.remove('calendar__cell_formating');
  form.remove();
};

const generateLocalState = () => {
  const taskName = document.getElementsByName('task_name')[0].value;
  const taskDate = document.getElementsByClassName('calendar__cell_formating')[0].getAttribute('data-date');
  const storageKey = taskDate;
  const taskMembers = document.getElementsByName('members')[0].value;
  const taskDescription = document.getElementsByName('description')[0].value;
  // Generate local data
  const cellData = {
    taskName,
    taskDate,
    taskMembers,
    taskDescription,
  };
  // Input cell data to local storage
  localStorage.setItem(storageKey, JSON.stringify(cellData));
};

const showEventPopup = (cellDate = Date.now()) => {
  popupForm.setAttribute('class', 'task_adjunction_popup__background');
  popupForm.innerHTML = popupHTML;
  main.appendChild(popupForm);

  if (localStorage.getItem(cellDate) !== null) {
    const data = JSON.parse(localStorage.getItem(cellDate));
    // Styled popup area elements!!!
    const styledTaskName = document.createElement('div');
    styledTaskName.setAttribute('class', 'task_adjunction_popup__styled_header');
    styledTaskName.textContent = data.taskName;

    const styledTaskDate = document.createElement('div');
    styledTaskDate.setAttribute('class', 'task_adjunction_popup__styled_date');
    styledTaskDate.textContent = format(parseISO(data.taskDate), 'd MMMM', { locale: ru });

    const styledTaskMembers = document.createElement('div');
    styledTaskMembers.setAttribute('class', 'task_adjunction_popup__styled_members');
    styledTaskMembers.textContent = data.taskMembers;

    const styledTaskDescription = document.createElement('div');
    styledTaskDescription.setAttribute('class', 'task_adjunction_popup__styled_description');
    styledTaskDescription.textContent = data.taskDescription;

    // document.getElementsByName('task_name')[0].replaceWith(styledTaskName);
    document.getElementsByName('task_name')[0].value = data.taskName;
    document.getElementsByName('members')[0].value = data.taskMembers;
    document.getElementsByName('description')[0].value = data.taskDescription;
  }

  const closeButton = document.getElementsByClassName('task_adjunction_popup__close_button')[0];
  closeButton.addEventListener('click', () => {
    closeForm(popupForm);
  });

  const acceptButton = document.getElementsByClassName('task__adjunction_popup__accept_button')[0];
  acceptButton.addEventListener('click', (event) => {
    event.preventDefault();
    generateLocalState();
    generateCalendar(parseISO(cellDate));
  });

  const deleteButton = document.getElementsByClassName('task__adjunction_popup__delete_button')[0];
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem(cellDate);
    generateCalendar(parseISO(cellDate));
  });
};

export default showEventPopup;
