  const buttonEdit = document.querySelector('.button-edit');
  const buttonClose = document.querySelector('.button-close');
  const popup = document.querySelector('.popup');

  function popupOpen(evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
  }

  function popupClose(evt) {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
  }

  buttonEdit.addEventListener('click', popupOpen);
  buttonClose.addEventListener('click', popupClose);

  let formElement = document.querySelector('.popup__container');
  let nameInput = formElement.querySelector('user-name');
  let jobInput = formElement.querySelector('user-description');

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

  formElement.addEventListener('submit', formSubmitHandler);
