import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import renderCalendar from './renderCalendar.js'
import showEventPopup from './eventPopup.js';

const inputSearchForm = document.getElementsByClassName('header__search_area')[0];
const resultsMenu = document.getElementsByClassName('search_results')[0];
const closeButton = document.getElementsByClassName('header__search_form_close_button')[0];

const parseLocalStorage = (storage) => {
  const result = [];
  const storageItems = Object.entries(storage);
  storageItems.forEach(([itemKey, itemValue]) => {
    const parsedItemValue = JSON.parse(itemValue);
    result.push({ [itemKey]: parsedItemValue });
  });
  return result;
};

// Too long string
// const normolizeStorage = (parsedStorage) => parsedStorage.reduce((acc, item) => ([...acc, Object.values(item)[0]]), []);

const normolizeStorage = (parsedStorage) => {
  const result = parsedStorage.reduce((acc, item) => ([...acc, Object.values(item)[0]]), []);
  return result;
};

const filterData = (data, searchExpression) => {
  const updatedData = [];
  // Keys for compared searching string
  const comparedKeys = ['taskName', 'taskDate', 'taskMembers'];
  const searchingChars = new RegExp(searchExpression, 'i');

  if (searchExpression === '') {
    return data;
  }

  // Add compared string to object
  for (const item of data) {
    const comparedString = comparedKeys.reduce((acc, key) => (`${acc} ${item[key]}`), '');
    item.comparedString = `${comparedString} ${format(parseISO(item.taskDate), 'dd MMMM', { locale: ru })}`;
    updatedData.push(item);
  }
  const filteredData = updatedData.filter((item) => {
    const result = item.comparedString.match(searchingChars);
    return result !== null;
  });
  return filteredData;
};

const createResultElement = (data) => {
  const resultTaskBody = document.createElement('div');
  resultTaskBody.setAttribute('class', 'search_results__task_body');
  resultTaskBody.setAttribute('data-result-link', data.taskDate);

  const resultTaskHeader = document.createElement('div');
  resultTaskHeader.setAttribute('class', 'search_results__task_header');
  resultTaskHeader.textContent = data.taskName;

  const resultTaskDate = document.createElement('div');
  resultTaskDate.setAttribute('class', 'search_results__task_date');
  resultTaskDate.textContent = format(parseISO(data.taskDate), 'dd MMMM', { locale: ru });

  resultTaskBody.appendChild(resultTaskHeader);
  resultTaskBody.appendChild(resultTaskDate);

  // Folowing link action
  resultTaskBody.addEventListener('click', (event) => {
    const currentElement = event.target.closest('[data-result-link]');
    const targetDate = parseISO(currentElement.getAttribute('data-result-link'));
    renderCalendar(targetDate);
    // Clear input & result search form
    inputSearchForm.value = '';
    resultsMenu.style.display = 'none';
    closeButton.style.display = 'none';
    showEventPopup(targetDate);
  });

  return resultTaskBody;
};

const dynamicSearch = (storage, searchExpression = '') => {
  const outputArea = document.getElementsByClassName('search_results')[0];
  outputArea.innerHTML = '';

  const parsedStorageData = parseLocalStorage(storage);
  const normolizedStorageData = normolizeStorage(parsedStorageData);
  const filteredStorage = filterData(normolizedStorageData, searchExpression);

  filteredStorage.forEach((itemData) => {
    outputArea.appendChild(createResultElement(itemData));
  });
};

inputSearchForm.addEventListener('focus', () => {
  resultsMenu.style.display = 'flex';
  closeButton.style.display = 'block';
  dynamicSearch(localStorage);
});

inputSearchForm.addEventListener('input', (event) => {
  const searchingExpression = event.target.value;
  dynamicSearch(localStorage, searchingExpression);
});
// inputSearchForm.addEventListener('blur', () => {
//   resultsMenu.style.display = 'none';
//   closeButton.style.display = 'none';
// })

closeButton.addEventListener('click', () => {
  inputSearchForm.value = '';
  resultsMenu.style.display = 'none';
  closeButton.style.display = 'none';
});

export default dynamicSearch;
