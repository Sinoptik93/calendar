import { parse, formatISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import renderCalendar from './renderCalendar.js';

const addEventButton = document.querySelector('.header__add_event__button');
const quickAddForm = document.querySelector('.quick_add');
const inputArea = document.querySelector('.quick_add__input_form');
const createEventButton = document.querySelector('.quick_add__create_button');
const quickFormCloseButton = document.querySelector('.quick_add__close_button');

const parseString = (string) => {
  console.log(string);
  const elements = string.split(', ');
  console.log(elements);

  if (elements.length < 2) {
    alert('Заполните поле форматом: "дата, название события, участники"');
    return;
  }

  const [taskDate, taskName, taskMembers] = elements;
  const parsedDate = parse(taskDate, 'dd MMMM', new Date(), { locale: ru });
  const storageKey = formatISO(parsedDate, { representation: 'date' });
  const newStorageItem = {
    taskName,
    taskDate: storageKey,
    taskMembers,
    taskDescription: '',
  };

  localStorage.setItem(storageKey, JSON.stringify(newStorageItem));
};

addEventButton.addEventListener('click', (event) => {
  event.preventDefault();
  addEventButton.setAttribute('disabled', true);
  quickAddForm.style.display = 'block';
});

createEventButton.addEventListener('click', (event) => {
  event.preventDefault();
  parseString(inputArea.value);
  addEventButton.removeAttribute('disabled');
  quickAddForm.style.display = 'none';
  inputArea.value = '';
  renderCalendar();
});

quickFormCloseButton.addEventListener('click', () => {
  addEventButton.removeAttribute('disabled');
  quickAddForm.style.display = 'none';
  inputArea.value = '';
});
