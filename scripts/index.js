const selectors = {
  page: '.page',
  //шаблон карточки
  card: '.cards',
  cardsTemplate: '#cards-template',
  cardElement: '.cards__item',
  buttonDel: '.cards__basket',
  cardsImage: '.cards__image',
  cardsName: '.cards__title',
  buttonLike: '.cards__like',
  //попап редактирования
  popupEdit: '.popup__form-edit',
  buttonEdit: '.profile__button-edit',
  formElementEdit: '.popup__container',
  //попап данные и поля для заполения
  popup: '.popup',
  nameInput: '#user-name',
  jobInput: '#user-title',
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  //попап добавления карточки
  popupCard: '.popup__form-card',
  buttonAdd: '.profile__button-add',
  formElementCard: '.popup__container',
  // попап данные и поля для заполения
  nameCard: '#card-name',
  linkCard: '#card-address',
  //попап картинки
  popupImg: '.popup__form-image',
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
const card = page.querySelector(selectors.card); //карточка
const cardsTemplate = page.querySelector(selectors.cardsTemplate).content; //шаблон карточки

//Кнопки
const buttonEdit = page.querySelector(selectors.buttonEdit); //редактировать
const buttonAdd = page.querySelector(selectors.buttonAdd); //добавить
const buttonCloseEdit =page.querySelector(selectors.close);
const buttonCloseAdd =page.querySelector(selectors.close);
const buttonCloseImg =page.querySelector(selectors.close);

const popupEdit = page.querySelector(selectors.popupEdit); //попап редактирования
const formElementEdit = page.querySelectorAll(selectors.formElementEdit)[0]; //форма попап редактирования

const nameInput = formElementEdit.querySelector(selectors.nameInput); //поле имя в форме
const jobInput = formElementEdit.querySelector(selectors.jobInput); //поле о себе в форме
const profileName = page.querySelector(selectors.profileName); //от куда вставляеться в поле Имя
const profileDescription = page.querySelector(selectors.profileDescription); //от куда вставляеться в поле О себе

const popupCard = page.querySelector(selectors.popupCard); // попап создания
const formElementCard = page.querySelectorAll(selectors.formElementCard)[1]; //форма попап создания
const nameCard = formElementCard.querySelector(selectors.nameCard); // имя карточки
const linkCard = formElementCard.querySelector(selectors.linkCard); // адрес карточки

const popupImg = page.querySelector(selectors.popupImg); // попап картинки
const popupImage = popupImg.querySelector(selectors.popupImage); // картинка
const popupText = popupImg.querySelector(selectors.popupText); //подпись картинки

function createCard(link, name) {
  const cardElement = cardsTemplate
    .querySelector(selectors.cardElement)
    .cloneNode(true);
  const cardsImage = cardElement.querySelector(selectors.cardsImage);
  const cardName = cardElement.querySelector(selectors.cardsName);
  const buttonDel = cardElement.querySelector(selectors.buttonDel);
  const buttonLike = cardElement.querySelector(selectors.buttonLike);

  cardName.textContent = name;
  cardsImage.src = link;
  cardsImage.alt = name;

  buttonDel.addEventListener('click', () => cardElement.remove());

  buttonLike.addEventListener('click', () =>
    buttonLike.classList.toggle(selectors.like)
  );

  cardsImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupText.textContent = name;
    popupOpen(popupImg);
  });

  return cardElement;
}

function renderCard(container, data, position = 'before') {
  switch (position) {
    case 'before':
      container.prepend(createCard(data.link, data.name));
      break;
    case 'after':
      container.append(createCard(data.link, data.name));
    default:
      break;
  }
}

function addEventListener() {
  formElementCard.addEventListener('submit', (e) => {
    e.preventDefault();
    renderCard(card, { link: linkCard.value, name: nameCard.value }, 'before');
    popupClose(popupCard);
    e.target.reset();
  });
}

addEventListener();

function createInitialCard() {
  initialCards.forEach((item) => renderCard(card, item, 'after'));
}

createInitialCard();

function popupOpen(pop) {
  pop.classList.add(selectors.popupOpened);
} //форма открытия редактирования

function popupClose(pop) {
  pop.classList.remove(selectors.popupOpened);
} //закрыть попап

function popupCloseAll(e) {
  const target = e.target;
  const modal = target.closest(selectors.popup);
  if (target.classList.contains(selectors.close) || target === modal) {
    popupClose(modal);
  }
}// закрытие

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
  popupClose(popupEdit);
}

popupEdit.addEventListener('click', popupCloseAll); //закрыть попап редактирования
popupCard.addEventListener('click', popupCloseAll); //закрыть попап карточки
popupImg.addEventListener('click', popupCloseAll); //закрыть попап картинки

formElementEdit.addEventListener('submit', addformSubmitHandler);

buttonEdit.addEventListener('click', () => {
  insertValuesToField(); // Вставляем значения из документа в поля формы с помощью textContent
  popupOpen(popupEdit);
});

buttonAdd.addEventListener('click', () => popupOpen(popupCard));
