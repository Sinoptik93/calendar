const cellsArray = document.getElementsByClassName('calendar__cell');

for (const cell of cellsArray) {
  console.log(1);
  cell.addEventListener('click', () => {
    console.log(`${cell} click!`);
  });
}