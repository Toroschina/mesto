const page = document.querySelector(selectors.page);
const card = page.querySelector(selectors.card); //карточка
const cardsTemplate = page.querySelector(selectors.cardsTemplate).content; //шаблон карточки

//Кнопки
const buttonEdit = page.querySelector(selectors.buttonEdit); //редактировать
const buttonAdd = page.querySelector(selectors.buttonAdd); //добавить

const popupEdit = page.querySelector(selectors.popupEdit); //попап редактирования
const formElementEdit = page.querySelectorAll(selectors.formElementEdit)[0]; //форма попап редактирования
const buttonCloseEdit = popupEdit.querySelector(selectors.close);

const nameInput = formElementEdit.querySelector(selectors.nameInput); //поле имя в форме
const jobInput = formElementEdit.querySelector(selectors.jobInput); //поле о себе в форме
const profileName = page.querySelector(selectors.profileName); //от куда вставляеться в поле Имя
const profileDescription = page.querySelector(selectors.profileDescription); //от куда вставляеться в поле О себе

const popupCard = page.querySelector(selectors.popupCard); // попап создания
const formElementCard = page.querySelectorAll(selectors.formElementCard)[1]; //форма попап создания
const nameCard = formElementCard.querySelector(selectors.nameCard); // имя карточки
const linkCard = formElementCard.querySelector(selectors.linkCard); // адрес карточки
const buttonCloseAdd = popupCard.querySelector(selectors.close);

const popupImg = page.querySelector(selectors.popupImg); // попап картинки
const popupImage = popupImg.querySelector(selectors.popupImage); // картинка
const popupText = popupImg.querySelector(selectors.popupText); //подпись картинки
const buttonCloseImg = popupImg.querySelector(selectors.close);

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

  buttonDel.addEventListener("click", () => cardElement.remove());

  buttonLike.addEventListener("click", () =>
    buttonLike.classList.toggle(selectors.like)
  );

  cardsImage.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupText.textContent = name;
    openPopup(popupImg);
  });

  return cardElement;
}

function renderCard(container, data, position = "before") {
  switch (position) {
    case "before":
      container.prepend(createCard(data.link, data.name));
      break;
    case "after":
      container.append(createCard(data.link, data.name));
    default:
      break;
  }
}

function addEventListener() {
  formElementCard.addEventListener("submit", (e) => {
    e.preventDefault();
    renderCard(card, { link: linkCard.value, name: nameCard.value }, "before");
    closePopup(popupCard);
    e.target.reset();
  });
}

addEventListener();

function renderInitialCards() {
  initialCards.forEach((item) => renderCard(card, item, "after"));
}

renderInitialCards();

function openPopup(pop) {
  pop.classList.add(selectors.openPopuped);
  document.addEventListener("keyup", closeByEscPress);
} //форма открытия редактирования

function closePopup(pop) {
  pop.classList.remove(selectors.openPopuped);
  document.addEventListener("keyup", closeByEscPress);
} //закрыть попап

function closeByOverlayClick(e) {
  const target = e.target;
  const modal = target.closest(selectors.popup);
  if (target.classList.contains(selectors.close) || target === modal) {
    closePopup(modal);
  }
} // закрытие

function closeByEscPress(evt) {
  if (evt.key === "Escape") {
    const openPopuped = page.querySelector(".popup_opened");
    closePopup(openPopuped);
  }
} // закрытие по ESC

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
  closePopup(popupEdit);
}

popupEdit.addEventListener("click", closeByOverlayClick); //закрыть попап редактирования
popupCard.addEventListener("click", closeByOverlayClick); //закрыть попап карточки
popupImg.addEventListener("click", closeByOverlayClick); //закрыть попап картинки

formElementEdit.addEventListener("submit", addformSubmitHandler);

buttonEdit.addEventListener("click", () => {
  insertValuesToField(); // Вставляем значения из документа в поля формы с помощью textContent
  openPopup(popupEdit);
});

buttonAdd.addEventListener("click", () => openPopup(popupCard));
