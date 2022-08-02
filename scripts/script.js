const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]; // массив карточек

const selectors = {
  page: '.page',
  //шаблон карточки
  cards: '.cards',
  cardsTemplate: '#cards-template',
  cardElement: '.cards__item',
  buttonDel: '.cards__basket',
  cardsImage: '.cards__image',
  cardsName: '.cards__title',
  buttonLike: '.cards__like',
  //попап редактирования
  popupEdit: '.popup_edit',
  buttonEdit: '.profile__button-edit',
  formElement: '.popup__container',
  //попап данные и поля для заполения
  popup: '.popup',
  nameInput: '#user-name',
  jobInput: '#user-title',
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  //попап добавления карточки
  popupCard: '.popup_card',
  buttonAdd: '.profile__button-add',
  formElementCard: '.popup__container',
  // попап данные и поля для заполения
  nameCard: '#card-name',
  linkCard: '#card-address',
  //попап картинки
  popupImg: '.popup_image',
  popupImage: '.popup__image',
  popupText: '.popup__text',
  //закрыть форму
  close: 'close',
  //открыть форму
  popupOpened: 'popup_opened',
  //лайк
  like: 'cards__like-active',
};
const page = document.querySelector(selectors.page);
const cards = page.querySelector(selectors.cards); //карточка
const cardsTemplate = page.querySelector(selectors.cardsTemplate).content; //шаблон карточки

//Кнопки
const buttonEdit = page.querySelector(selectors.buttonEdit); //редактировать
const buttonAdd = page.querySelector(selectors.buttonAdd); //добавить

const popupEdit = page.querySelector(selectors.popupEdit); //попап редактирования
const formElement = page.querySelectorAll(selectors.formElement)[0]; //форма попап редактирования

const nameInput = formElement.querySelector(selectors.nameInput); //поле имя в форме
const jobInput = formElement.querySelector(selectors.jobInput); //поле о себе в форме
const profileName = document.querySelector(selectors.profileName); //от куда вставляеться в поле Имя
const profileDescription = document.querySelector(selectors.profileDescription); //от куда вставляеться в поле О себе

const popupCard = page.querySelector(selectors.popupCard); // попап создания
const formElementCard = page.querySelectorAll(selectors.formElementCard)[1]; //форма попап создания
const nameCard = formElementCard.querySelector(selectors.nameCard); // имя карточки
const linkCard = formElementCard.querySelector(selectors.linkCard); // адрес карточки

const popupImg = page.querySelector(selectors.popupImg); // попап картинки
const popupImage = page.querySelector(selectors.popupImage); // картинка
const popupText = page.querySelector(selectors.popupText); //подпись картинки

function createCard(link, name) {
  const cardElement = cardsTemplate.querySelector(selectors.cardElement).cloneNode(true);
  const cardsImage = cardElement.querySelector(selectors.cardsImage);
  const cardName = cardElement.querySelector(selectors.cardsName);
  const buttonDel = cardElement.querySelector(selectors.buttonDel);
  const buttonLike = cardElement.querySelector(selectors.buttonLike);

  cardsImage.src = link;
  cardsImage.alt = name;
  cardName.textContent = name;

  buttonDel.addEventListener('click', () => cardElement.remove());

  buttonLike.addEventListener('click', () => buttonLike.classList.toggle(selectors.like));

  cardsImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupText.textContent = name;
    popupOpen(popupImg);
  })

  return cardElement;
}

function addEventListener() {
  formElementCard.addEventListener('submit', (e) => {
    e.preventDefault();
    cardElements.prepend(createCard(linkCard.value, nameCard.value));
    popupClose(popupCard);
  })
}

function addEventListener() {
  formElementCard.addEventListener('submit', (e) => {
    e.preventDefault();
    popupClose(popupCard);
  });
}
addEventListener();

function createInitialCard() {
  initialCards.forEach((item) => cards.append(createCard(item.link, item.name)))
}

createInitialCard();

function popupOpen(pop) {
  pop.classList.add(selectors.popupOpened);
} //форма открытия редактирования

function popupClose(pop) {
  pop.classList.remove(selectors.popupOpened);
} //закрыть попап

function popupCloseAll(evt) {
  const target = evt.target;
  const modal = target.closest(selectors.popup);
  if (target.classList.contains(selectors.close) || target === modal) {
    popupClose(modal);
  }
} // закрытие по всем кнопкам
function insertValuesFromField() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
} //функция поиск поля в форме

function insertValuesToField() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
} //функция вставки значения в поле

function addformSubmitHandler(e) {
  e.preventDefault();
  insertValuesFromField();
  popupClose(formElement);
} // Вставляет значения из полей

page.addEventListener('click', popupCloseAll); //закрыть попап

page.addEventListener('submit', addformSubmitHandler);

buttonEdit.addEventListener('click', () => {
  insertValuesToField(); // Вставляем значения из документа в поля формы с помощью textContent
  popupOpen(popupEdit);
});

buttonAdd.addEventListener('click', () => popupOpen(popupCard));
