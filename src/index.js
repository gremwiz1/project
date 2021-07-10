const addProductButton = document.querySelector('.popup__add-product_button');
const popupEditInfo = document.querySelector('.popup_edit-info');
const popupAddingProducts = document.querySelector('.popup_adding-products');
const formAddingProducts = document.getElementById('form-adding-products');
const buttonPopupClose = document.querySelector('.popup__button-close');
const checkBoxes = document.querySelectorAll('.checkbox');
const popupSubmitCart = document.querySelector('.popup_submit-cart');
const inputsTypeRadio = document.querySelectorAll('.checkbox_invisible');
const sectionScrollPopup = document.querySelector('.popup__container_scroll');
const templateElement = document.querySelector('.template');
const templateElementLoader = document.querySelector('.template-loader');
const buttonSubmitCart = document.getElementById('summa-cart');
const buttonSubmitFormInfo = document.getElementById('button-submit-form-info');
const formCart = document.getElementById('form-cart');
const formInfo = document.getElementById('form-info');
const popupPaymentSuccess = document.querySelector('.popup_payment-success');
const popupPaymentError = document.querySelector('.popup_payment-error');
Array.from(checkBoxes).map((item) => {
    item.addEventListener('click', changeCheckBox);
})
addProductButton.addEventListener('click', openAddProductPopup);
buttonPopupClose.addEventListener('click', closeForm);
formAddingProducts.addEventListener('submit', submitPopupAddingProducts);
formCart.addEventListener('submit',submitCart);
formInfo.addEventListener('submit',submitFormInfo);
function changeCheckBox(evt) {
    let activeCheckBox = popupAddingProducts.querySelector('.checkbox_visible-focus');
    activeCheckBox.classList.remove('checkbox_visible-focus');
    let checkBoxActive = activeCheckBox.closest('.checkbox');
    let radioCheck = checkBoxActive.querySelector('.checkbox_invisible');
    radioCheck.removeAttribute('checked');
    let buttonActiveCheckBox = activeCheckBox.querySelector('.checkbox__button_acitve');
    buttonActiveCheckBox.classList.remove('checkbox__button_acitve');
    buttonActiveCheckBox.classList.add('checkbox__button_inacitve');
    let newActiveCheckBox = evt.target.closest('.checkbox')
    let spanInActiveCheckBox = newActiveCheckBox.querySelector('.checkbox_visible');
    spanInActiveCheckBox.classList.add('checkbox_visible-focus');
    let newButtonActiveCheckBox = newActiveCheckBox.querySelector('.checkbox__button_inacitve');
    newButtonActiveCheckBox.classList.remove('checkbox__button_inacitve');
    newButtonActiveCheckBox.classList.add('checkbox__button_acitve');
    let newRadioCheck = newActiveCheckBox.querySelector('.checkbox_invisible');
    newRadioCheck.checked = true;
}
function closeForm() {
    closePopup(popupEditInfo);
}
function openAddProductPopup() {
    closePopup(popupEditInfo);
    openPopup(popupAddingProducts);
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function submitPopupAddingProducts(e) {
    e.preventDefault();
    closePopup(popupAddingProducts);
    let checkedBox = Array.from(inputsTypeRadio).find(el => el.checked === true);
    let quantity = checkedBox.id;
    openPopup(popupSubmitCart);
    for (let i = 1; i <= quantity; i++) {
        const cardElement = renderCard(i);
        addItem(cardElement);
    }
    recalculatingCart();
}
function renderCard(i) {
    const newItem = templateElement.content.cloneNode(true);
    const cardTitle = newItem.querySelector('.popup__subtitle');
    cardTitle.textContent = 'Product ' + i;
    setEventListeners(newItem);
    return newItem;
}
function addItem(item) {
    sectionScrollPopup.append(item);
}
function setEventListeners(card) {
    const buttonDeleteCard = card.querySelector('.form-container__delete-button');
    buttonDeleteCard.addEventListener('click', deleteCard);
}
function deleteCard(e) {
    let deleteElement = e.target.closest('.card');
    deleteElement.remove();
    recalculatingCart();
}
function recalculatingCart() {
    let quantityProducts = sectionScrollPopup.children.length;
    switch (quantityProducts) {
        case 1: buttonSubmitCart.textContent = 'Submit and Pay 24.99 USD';
            break;
        case 2: buttonSubmitCart.textContent = 'Submit and Pay 44 USD';
            break;
        case 3: buttonSubmitCart.textContent = 'Submit and Pay 60 USD';
            break;
        case 4: buttonSubmitCart.textContent = 'Submit and Pay 72 USD';
            break;
        case 5: buttonSubmitCart.textContent = 'Submit and Pay 80 USD';
            break;
        case 0: buttonSubmitCart.textContent = 'Submit and Pay 0 USD';
            break;
    }
}
function submitCart(e) {
    e.preventDefault();
    buttonSubmitCart.textContent = "";
    const newLoader = templateElementLoader.content.cloneNode(true);
    /* Здесь по идее должен идти fetch запрос - пока он выполняется должен крутиться лоадер и в зависимости от того был ли успешен 
    запрос появляться соответствующий попап, но так как этого нет - просто крутим лоадер 3 сек и потом отображаем
    случайный попап */
    buttonSubmitCart.append(newLoader);
   setTimeout(() => {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
            closePopup(popupSubmitCart);
            openPopup(popupPaymentSuccess);
            updateURL('?=paymentsuccess');
            }
        if (random === 1) {
            closePopup(popupSubmitCart);
            openPopup(popupPaymentError);
            updateURL('?=paymenterror');
        }
      },3000);
}
function submitFormInfo(e) {
    e.preventDefault();
    buttonSubmitFormInfo.textContent = "";
    const newLoader = templateElementLoader.content.cloneNode(true);
    /* Здесь по идее должен идти fetch запрос - пока он выполняется должен крутиться лоадер и в зависимости от того был ли успешен 
    запрос появляться соответствующий попап, но так как этого нет - просто крутим лоадер 3 сек и потом отображаем
    случайный попап */
    buttonSubmitFormInfo.append(newLoader);
   setTimeout(() => {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
            closePopup(popupEditInfo);
            openPopup(popupPaymentSuccess);
            updateURL('?=paymentsuccess');
            }
        if (random === 1) {
            closePopup(popupEditInfo);
            openPopup(popupPaymentError);
            updateURL('?=paymenterror');
        }
      },3000);
}
function updateURL(url) {
    if (history.pushState) {
        var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        var newUrl = baseUrl + url;
        history.pushState(null, null, newUrl);
    }
    else {
        console.warn('History API не поддерживается');
    }
}