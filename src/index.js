import renderCalendar from './modules/renderCalendar.js';
import dynamicSearch from './modules/search.js';
import quickAdd from './modules/quickAdd.js';

const updateButton = document.querySelector('.header__update_button');
updateButton.addEventListener('click', (event) => {
  event.preventDefault();
  renderCalendar();
});

// Initial render
renderCalendar();
