const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];  // массив карточек
const page = document.querySelector('.page');

const buttonLike = page.querySelector('.cards__like'); //лайк

const buttonEdit = page.querySelector('.profile__button-edit'); //редактировать
const buttonClose = page.querySelector('.popup__button-close'); //закрыть
const buttonAdd = page.querySelector('.profile__button-add'); //добавить
const buttonSaveCard = page.querySelectorAll('.popup__button-save')[1]; //сохранить карточку
const buttonSave = page.querySelectorAll('.popup__button-save')[0]; //сохранить профиль

const popupEdit = document.querySelector('#popup-edit'); //попап редактирования
const popupAdd = document.querySelector('#popup-card'); // попап создания
const popupImage = document.querySelector('#popup-image'); // попап картинки

let formElement = page.querySelectorAll('.popup__container')[0]; //форма попап редактирования
let formElementCard = page.querySelectorAll('.popup__container')[1];  //форма попап создания

let nameInput = formElement.querySelector('#user-name');  //поле имя в форме
let jobInput = formElement.querySelector('#user-title');  //поле о себе в форме

let profileName = document.querySelector('.profile__name');  //от куда вставляеться в поле Имя
let profileDescription = document.querySelector('.profile__description');  //от куда вставляеться в поле О себе

let nameCard = formElementCard.querySelector('#card-name');
let linkCard = formElementCard.querySelector('#card-address');

/* const image = page.querySelector('.popup__image'); // картинка */
const textPopup = page.querySelector('.popup__text');  //подпись картинки

const cardElementCard = page.querySelector('#cards-element').content; //шаблон карточки
const cardElements = page.querySelector('.cards'); //карточка

const cardsInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function show() {
  cardsInfo.forEach(showCard);
}

function showCard({ name, link }) {
  const showCards = cardElementCard
    .querySelector(".cards__item")
    .cloneNode(true);
    showCards.querySelector(".cards__title").textContent = name;
    showCards.querySelector(".cards__image").src = link;

    cardElements.append(showCards);
}
show();

function popupOpen(pop) {
  pop.classList.add('popup_opened');
}  //форма открытия редактирования

function insertValuesFromField() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}  //функция поиск поля в форме

function insertValuesToField() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}  //функция вставки значения в поле

function popupClose(pop) {
  pop.classList.remove('popup_opened');
}  //закрыть попап

function popupCloseAll(evt) {
  const target = evt.target;
  const modal = target.closest('.popup');
  if (target.classList.contains('close') || target === modal) {
    popupClose(modal);
  }
}  //закрытие всех форм

function like(l) {
  l.classList.toggle('cards__like-active');
}  //функция лайк

function likeAll(likeAll) {
  const target = likeAll.target;
  if (target.classList.contains('cards__like')) {
    like(target);
  }
}  //функция лайк

function Delete(del) {
  const cardItem = del.closest('.cards__item');
  cardItem.remove();
}//функция удаления

function deleteCard(delAll) {
  const target = delAll.target;
  if (target.classList.contains('cards__basket')) {
    Delete(target);
  }
}  //функция удаления

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupClose(formElement);
}  // Вставляет значения из полей

function formSubmitHandler(e) {
  e.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  insertValuesFromField(); // Вставляем новые значения из полей в документ с помощью textContent
  popupClose(popupEdit);
}  // Вставляет новые значения из полей

function formSubmitHandlerCard(e) {
  e.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const cardElement = cardElementCard.querySelector('.cards__item').cloneNode(true);
  cardElement.querySelector('.cards__image').src = linkCard.value;
  cardElement.querySelector('.cards__image').dataset.caption = nameCard.value;
  cardElement.querySelector('.cards__title').textContent = nameCard.value;
  cardElements.prepend(cardElement);
  popupOpen(popupAdd);
}

function openImage(e) {
  const target = e.target;
  if (target.classList.contains('cards__image')) {
    popupImage.querySelector('.popup__image').src = target.src;
    popupImage.querySelector('.popup__text').textContent = target.dataset.caption;
    popupOpen(popupImage);
  }
}

page.addEventListener('click', popupCloseAll);  //закрыть попап
page.addEventListener('click', likeAll); //лайк карточки
page.addEventListener('click', deleteCard);  //удалить карточку
page.addEventListener('click', openImage);  //открыть картинку

formElement.addEventListener('submit', formSubmitHandler); // форма профиля
formElementCard.addEventListener('submit', formSubmitHandlerCard); // форма карточки

buttonEdit.addEventListener('click', () => {
  insertValuesToField(); // Вставляем значения из документа в поля формы с помощью textContent
  popupOpen(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  insertValuesToField();
  popupOpen(popupAdd);
});
