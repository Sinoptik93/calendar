const inputSearchForm = document.getElementsByClassName('header__search_area')[0];
const resultsMenu = document.getElementsByClassName('search_results')[0];
const closeButton = document.getElementsByClassName('header__search_form_close_button')[0];

inputSearchForm.addEventListener('focus', () => {
  resultsMenu.style.display = 'flex';
  closeButton.style.display = 'block';
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

const parseLocalStorage = (storage) => {
  const result = [];
  const storageItems = Object.values(storage);
  for (const value of storageItems) {
    const searchingString = [];
    const pasedItem = JSON.parse(value);
    for (const [parsedKey, parsedValue] in pasedItem) {
      searchingString.push({ parsedKey: parsedValue });
    }
    result.push(`${{ searchingString, data: pasedItem }}`);
  }
  return result;
};

const dynamicSearch = () => {
  const searchArea = document.getElementsByClassName('header__search_area')[0];
  const parsedCurrentStorage = parseLocalStorage(localStorage);
  searchArea.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    parsedCurrentStorage.forEach((currentEvent) => {

    });
  });
};

export default dynamicSearch;
