  const buttonEdit = document.querySelector('.button__edit');
  const buttonClose = document.querySelector('.button__close');
  const popup = document.querySelector('.popup');

  function popupOpen(e) {
    e.preventDefault();
    popup.classList.add('popup_opened');
  }

  function popupClose(e) {
    e.preventDefault();
    popup.classList.remove('popup_opened');
  }

  buttonEdit.addEventListener('click', popupOpen);
  buttonClose.addEventListener('click', popupClose);

/*   let formElement = document.querySelector('.popup__container');
  let nameInput = formElement.querySelector('#user-name');
  let jobInput = formElement.querySelector('#user-description');

  function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInputText = nameInput.value;
  jobInputText = jobInput.value;

  let profileName = document.querySelector('.name');
  let profileDescription = document.querySelector('.description');

  profileName.textContent = nameInputText;
  profileDescription.textContent = jobInputText;
  popup.classList.remove('popup_opened');
  }

  formElement.addEventListener('submit', formSubmitHandler); */
