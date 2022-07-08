  const buttonEdit = document.querySelector('.profile__button-edit');
  const buttonClose = document.querySelector('.popup__button-close');
  const popup = document.querySelector('.popup');

  function popupOpen() {
    popup.classList.add('popup_opened');
  }

  function popupClose() {
    popup.classList.remove('popup_opened');
  }

  buttonEdit.addEventListener('click', popupOpen);
  buttonClose.addEventListener('click', popupClose);

  let formElement = document.querySelector('.popup');
  let nameInput = formElement.querySelector('user-name');
  let jobInput = formElement.querySelector('user-title');

  function formSubmitHandler() {
    nameInputText = nameInput.value;
    jobInputText = jobInput.value;
    profileName.textContent = nameInputText;
    profileDescription.textContent = jobInputText;
    popup.classList.remove(popupClose);
}

  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__button-edit');
  formElement.addEventListener('submit', formSubmitHandler);
