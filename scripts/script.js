  const buttonEdit = document.querySelector('.profile__button-edit');
  const buttonClose = document.querySelector('.popup__button-close');
  const popup = document.querySelector('.popup');

  let formElement = document.querySelector('.popup__container');
  let nameInput = formElement.querySelector('#user-name');
  let jobInput = formElement.querySelector('#user-title');
  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');

  function popupOpen() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');

  }
  function popupClose() {
    popup.classList.remove('popup_opened');
  }

  function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClose();
  }
  buttonEdit.addEventListener('click', popupOpen);
  buttonClose.addEventListener('click', popupClose);
  formElement.addEventListener('submit', formSubmitHandler);
