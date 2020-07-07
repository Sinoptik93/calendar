const main = document.getElementsByClassName('calendar')[0];
const popupForm = document.createElement('div');

const showEventPopup = () => {
  const popupHTML = `
  <div class="task_adjunction_popup">
    <div class="task_adjunction_popup__body">
      <div class="task_adjunction_popup__close_button">✕</div>
      <form action="" class="task_adjunction_popup__form_body">
        <input type="text" name="task_name" class="task_adjunction_popup__task_name" placeholder="Событие">
        <input type="text" name="date" class="task_adjunction_popup__task_date" placeholder="День, месяц, год">
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

  popupForm.setAttribute('class', 'task_adjunction_popup__background')
  popupForm.innerHTML = popupHTML;
  main.appendChild(popupForm);
  
  const closeButton = document.getElementsByClassName('task_adjunction_popup__close_button')[0];
  closeButton.addEventListener('click', ()=> {
    const formattingCell = document.getElementsByClassName('calendar__cell_formating')[0];
    formattingCell.classList.remove('calendar__cell_formating')
    popupForm.remove();
  })

  // const background = document.getElementsByClassName('task_adjunction_popup__background')[0];
  // background.addEventListener('click', ()=> {
  //   const formattingCell = document.getElementsByClassName('calendar__cell_formating')[0];
  //   formattingCell.classList.remove('calendar__cell_formating')
  //   popupForm.remove();
  // })
};


export default showEventPopup;

