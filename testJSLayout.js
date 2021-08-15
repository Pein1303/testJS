'use strict'

let idCount = 0;
let elemForDelete = null;
let card = {};
let arrayOfCards = [{
        frameColor: 'frameForCheap',
        img: './pictures/cattleman-revolver.jpg',
        name: 'Cattleman Revolver',
        article: 'R35',
        count: 13,
        price: 25,
        date: '2021-04-21',
        desc: undefined,
        editButton: true,
        id: idCount++,
    },

    {
        frameColor: 'frameForOptimal',
        img: './pictures/M1899.jpg',
        name: 'M1899',
        article: 'G13',
        count: 19,
        price: 75,
        date: '2015-02-25',
        desc: undefined,
        editButton: true,
        id: idCount++,
    },

    {
        frameColor: 'frameForPremium',
        img: './pictures/semi-automatic-pistole.jpg',
        name: 'Semi Automatic Pistole',
        article: 'P57',
        count: 24,
        price: 130,
        date: '2020-07-13',
        desc: undefined,
        editButton: true,
        id: idCount++,
    },

    {
        frameColor: 'frameForCheap',
        img: './pictures/cowboy-revolver.jpg',
        name: 'Cowboy Revolver',
        article: 'R18',
        count: 5,
        price: 20,
        date: '2015-05-09',
        desc: undefined,
        editButton: true,
        id: idCount++,
    },

    {
        frameColor: 'frameForOptimal',
        img: './pictures/volcanic.jpg',
        name: 'Volcanic',
        article: 'G72',
        count: 1,
        price: 60,
        date: '2017-05-08',
        desc: undefined,
        editButton: true,
        id: idCount++,
    },

    {
        frameColor: 'frameForPremium',
        img: './pictures/mauser.jpg',
        name: 'Mauser',
        article: 'P34',
        count: 16,
        price: 100,
        date: '2016-06-29',
        desc: undefined,
        editButton: true,
        id: idCount++,
    },
];

/* сортировка по-умолчанию */
arrayOfCards.sort((a, b) => {
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
    };
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
    };
});

/* общий фон */
const mainCont = document.createElement('div');
mainCont.classList.add('main-cont');
document.body.append(mainCont);

/* общий заголовок */
const mainContTitle = document.createElement('h1');
mainContTitle.classList.add('main-cont__title', 'main-cont__title_wrap');
mainContTitle.innerText = 'Red Dead Shop';
mainCont.append(mainContTitle);

/* флекс-контейнер для взаимного расположения форм */
const formWrapper = document.createElement('div');
formWrapper.classList.add('main-cont__form-wrapper');
mainCont.append(formWrapper);

/* функция для добавления формы */
function getForm(id, formSize, formBack) {
    const form = document.createElement('form');
    form.id = id;
    form.classList.add(formSize, formBack, 'main-cont__form_wrap');
    formWrapper.append(form);
    return form;
};

/* функция для добавления филдсет-контейнера */
function getCont(title, someFunc) {
    const cont = document.createElement('fieldset');
    cont.classList.add('form__options-form');
    someFunc.append(cont);

    const nameOfCont = document.createElement('legend');
    nameOfCont.classList.add('form__options-form_title');
    nameOfCont.innerText = title;
    cont.append(nameOfCont);
    return cont;
};

/* функция для добавления инпута */
function getInput(type, id, name, value, checked, title, sumFunc) {
    const contForInput = document.createElement('div');
    contForInput.classList.add('options-form__input-wrapper');
    sumFunc.append(contForInput);

    const label = document.createElement('label');
    label.classList.add('options-form__label-font');
    label.innerText = title;
    contForInput.append(label);

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = name;
    input.value = value;
    input.checked = checked;
    input.classList.add('label__input-style', 'label__input-style_wrap');
    label.prepend(input);
};

/* функция для добавления поля описания */
function getTextarea(title, font, fontWrap, id, areaStyle, areaWrap) {
    const descriptionAreaTitle = document.createElement('div');
    descriptionAreaTitle.classList.add(font, fontWrap);
    descriptionAreaTitle.innerText = title;
    secondaryInformationCont.append(descriptionAreaTitle);

    const descriptionAreaForm = document.createElement('div');
    secondaryInformationCont.append(descriptionAreaForm);

    const descriptionArea = document.createElement('textarea');
    descriptionArea.id = id;
    descriptionArea.classList.add(areaStyle, areaWrap);
    descriptionAreaForm.append(descriptionArea);
};

/* функция для добавления кнопки */
function getButton(id, value, style, wrapper, sumFunc) {
    const buttonCont = document.createElement('div');
    buttonCont.classList.add(wrapper);
    sumFunc.append(buttonCont);

    const button = document.createElement('input');
    button.type = 'button';
    button.id = id;
    button.value = value;
    button.classList.add(style);
    buttonCont.append(button);
};

/* функция для добавления информации о неверном вводе */
function getWarning(id, text, sumFunc) {
    const warning = document.createElement('div');
    warning.classList.add('options-form___warning', 'options-form___warning_wrap');
    warning.id = id;
    warning.innerText = text;
    sumFunc.append(warning);
};

/* первая форма */
let productForm = getForm('productForm', 'main-cont__new-product-form', 'main-cont__new-product-form_back');

let mainInformCont = getCont('Main information', productForm);
getInput('text', 'nameOfNewProduct', '', '', '', 'Name', mainInformCont);
getWarning('warningName', 'This inpput should contain at least 5 characters!', mainInformCont);
getInput('text', 'articleOfNewProduct', '', '', '', 'Article', mainInformCont);
getWarning('warningArticle', 'Wrong article!', mainInformCont);
getInput('number', 'countOfNewProduct', '', '', '', 'Count', mainInformCont);
getWarning('warningCount', 'Count can\'t be less than 1!', mainInformCont);
getInput('number', 'priceOfNewProduct', '', '', '', 'Price', mainInformCont);
getWarning('warningPrice', 'Price can\'t be less than 1$ in our shop!', mainInformCont);
getInput('date', 'dateOfNewProduct', '', '', '', 'Creation date', mainInformCont);

let priceSegmentCont = getCont('Price segment', productForm);
getInput('radio', 'cheap', 'priceSegment', 'frameForCheap', '', 'Cheap', priceSegmentCont);
getInput('radio', 'optimal', 'priceSegment', 'frameForOptimal', '', 'Optimal', priceSegmentCont);
getInput('radio', 'premium', 'priceSegment', 'frameForPremium', '', 'Premium', priceSegmentCont);

let secondaryInformationCont = getCont('Secondary information', productForm);
getInput('text', 'linkForPicture', '', '', '', 'Picture', secondaryInformationCont);
getTextarea('Description', 'options-form___description-area-title', 'options-form___description-area-title_wrap', 'descriptionArea', 'options-form___description-area', 'options-form___description-area_wrap');

getButton('submitButton', 'Submit', 'form__submit-button', 'form__submit-button_wrap', productForm);

/* вторая форма */
let searchForm = getForm('searchForm', 'main-cont__sort-form', 'main-cont__sort-form_back');

let searchCont = getCont('Search', searchForm);
getInput('search', 'searchProduct', '', '', '', 'OK, Google!', searchCont);

let filterPriceSegmentCont = getCont('Filter by price segment', searchForm);
getInput('checkbox', 'filterCheap', 'filterByPriceSegment', 'frameForCheap', '', 'Cheap', filterPriceSegmentCont);
getInput('checkbox', 'filterOptimal', 'filterByPriceSegment', 'frameForOptimal', '', 'Optimal', filterPriceSegmentCont);
getInput('checkbox', 'filterPremium', 'filterByPriceSegment', 'frameForPremium', '', 'Premium', filterPriceSegmentCont);

let sortingSectionCont = getCont('Sorting section by...', searchForm);
getInput('radio', 'sortByAlphabet', 'sorting', '', 'checked', 'Alphabet', sortingSectionCont);
getInput('radio', 'sortByCount', 'sorting', '', '', 'Count', sortingSectionCont);
getInput('radio', 'sortByPrice', 'sorting', '', '', 'Price', sortingSectionCont);
getInput('radio', 'sortByDate', 'sorting', '', '', 'Date', sortingSectionCont);

/* третья форма */
let cardForm = getForm('cardForm', 'main-cont__card-form', 'main-cont__card-form_back');
arrayOfCards.forEach(item => {
    const cardOfProduct = document.createElement('div');
    cardOfProduct.classList.add('form__card', 'form__card_wrap');
    cardForm.append(cardOfProduct);

    const picture = document.createElement('div');
    picture.innerHTML = `<img src = ${item.img} onerror = this.src='./pictures/rdr2.jpg' width = 100% height = 100%>`;
    picture.classList.add('card__frame_wrap');
    if (item.frameColor === undefined) picture.classList.add('card__frame');
    if (item.frameColor === 'frameForCheap') picture.classList.add('card__frame-for-cheap');
    if (item.frameColor === 'frameForOptimal') picture.classList.add('card__frame-for-optimal');
    if (item.frameColor === 'frameForPremium') picture.classList.add('card__frame-for-premium');
    cardOfProduct.append(picture);

    const nameOfProduct = document.createElement('div');
    nameOfProduct.classList.add('card__name', 'card__name_wrap');
    nameOfProduct.innerText = `${item.name}`;
    cardOfProduct.append(nameOfProduct);

    const articleOfProduct = document.createElement('div');
    articleOfProduct.classList.add('card__description', 'card__description_wrap');
    articleOfProduct.innerText = `Article: ${item.article}`;
    cardOfProduct.append(articleOfProduct);

    const boxOfProduct = document.createElement('div');
    boxOfProduct.classList.add('card__box_wrap');
    cardOfProduct.append(boxOfProduct);

    const countOfProduct = document.createElement('div');
    countOfProduct.classList.add('card__description', 'card__description_wrap');
    countOfProduct.innerText = `Count: ${item.count}`;
    boxOfProduct.append(countOfProduct);

    const hiddenInformOfProduct = document.createElement('div');
    hiddenInformOfProduct.classList.add('box__hidden-inform', 'box__hidden-inform_wrap');
    hiddenInformOfProduct.innerText = 'Last one!';
    hiddenInformOfProduct.hidden = true;
    boxOfProduct.append(hiddenInformOfProduct);
    if (item.count < 2) hiddenInformOfProduct.hidden = false;

    const priceOfProduct = document.createElement('div');
    priceOfProduct.classList.add('card__description', 'card__description_wrap');
    priceOfProduct.innerText = `Price: ${item.price}$`;
    cardOfProduct.append(priceOfProduct);

    const dateOfProduct = document.createElement('div');
    dateOfProduct.classList.add('card__description', 'card__description_wrap');
    dateOfProduct.innerText = `Date: ${item.date.split('-').reverse().join('.')}`;
    cardOfProduct.append(dateOfProduct);

    if (item.desc !== undefined) {

        getButton('descButton', 'Show Description', 'card__hidden-desc', 'card__hidden-desc_wrap', cardOfProduct);

        const hiddenDesc = document.createElement('div');
        hiddenDesc.classList.add('card__hidden-text', 'card__hidden-text_wrap');
        hiddenDesc.innerText = `${item.desc}`;
        cardOfProduct.append(hiddenDesc);

        descButton.addEventListener('click', () => {
            if (hiddenDesc.style.display !== 'block') {
                hiddenDesc.style.display = 'block'
                descButton.value = 'Hide Description';
            } else {
                hiddenDesc.style.display = 'none'
                descButton.value = 'Show Description';
            };
        });
    };

    const editButtonCont = document.createElement('div');
    editButtonCont.classList.add('card__edit-button_wrap');
    cardOfProduct.append(editButtonCont);

    const editButton = document.createElement('input');
    editButton.type = 'button';
    editButton.id = item.id;
    editButton.value = 'Edit';
    editButton.classList.add('card__edit-button');
    editButtonCont.append(editButton);

    editButton.addEventListener('click', (event) => {
        event.preventDefault();
        cardOfProduct.innerHTML = '';
        const oldCard = arrayOfCards.find(item => item.id === +editButton.id);

        const contForEditPicture = document.createElement('div');
        contForEditPicture.classList.add('card__frame', 'card__frame_wrap');
        cardOfProduct.append(contForEditPicture);
        const linkForEditPicture = document.createElement('div');
        linkForEditPicture.classList.add('card-edit__input-picture-wrapper');
        contForEditPicture.append(linkForEditPicture);
        const editPicture = document.createElement('input');
        editPicture.type = 'text';
        editPicture.id = 'editPictureOfNewProduct';
        editPicture.value = `${oldCard.img}`;
        editPicture.classList.add('card-edit__input-edit-style');
        linkForEditPicture.append(editPicture);

        const contForEditName = document.createElement('div');
        contForEditName.classList.add('card-edit__input-wrapper');
        cardOfProduct.append(contForEditName);
        getWarning('warningEditName', 'This inpput should contain at least 5 characters!', cardOfProduct);
        const editName = document.createElement('input');
        editName.type = 'text';
        editName.id = 'editNameOfNewProduct';
        editName.value = `${oldCard.name}`;
        editName.classList.add('card-edit__input-edit-style');
        contForEditName.append(editName);

        const contForEditArticle = document.createElement('div');
        contForEditArticle.classList.add('card-edit__description', 'card-edit__description_wrap');
        cardOfProduct.append(contForEditArticle);
        getWarning('warningEditArticle', 'Wrong article!', cardOfProduct);
        const nameOfEditArticle = document.createElement('div');
        nameOfEditArticle.innerText = `Article: `;
        contForEditArticle.append(nameOfEditArticle);
        const editArticle = document.createElement('input');
        editArticle.type = 'text';
        editArticle.id = 'editArticleOfNewProduct';
        editArticle.value = `${oldCard.article}`;
        editArticle.classList.add('card-edit__input-edit-style', 'card-edit__input-edit-style_wrap');
        contForEditArticle.append(editArticle);

        const contForEditCount = document.createElement('div');
        contForEditCount.classList.add('card-edit__description', 'card-edit__description_wrap');
        cardOfProduct.append(contForEditCount);
        getWarning('warningEditCount', 'Count can\'t be less than 1!', cardOfProduct);
        const nameOfEditCount = document.createElement('div');
        nameOfEditCount.innerText = `Count: `;
        contForEditCount.append(nameOfEditCount);
        const editCount = document.createElement('input');
        editCount.type = 'number';
        editCount.id = 'editCountOfNewProduct';
        editCount.value = `${oldCard.count}`;
        editCount.classList.add('card-edit__input-edit-style', 'card-edit__input-edit-style_wrap');
        contForEditCount.append(editCount);

        const contForEditPrice = document.createElement('div');
        contForEditPrice.classList.add('card-edit__description', 'card-edit__description_wrap');
        cardOfProduct.append(contForEditPrice);
        getWarning('warningEditPrice', 'Price can\'t be less than 1$ in our shop!', cardOfProduct);
        const nameOfEditPrice = document.createElement('div');
        nameOfEditPrice.innerText = `Price: `;
        contForEditPrice.append(nameOfEditPrice);
        const editPrice = document.createElement('input');
        editPrice.type = 'number';
        editPrice.id = 'editPriceOfNewProduct';
        editPrice.value = `${oldCard.price}`;
        editPrice.classList.add('card-edit__input-edit-style', 'card-edit__input-edit-style_wrap');
        contForEditPrice.append(editPrice);

        const contForEditDate = document.createElement('div');
        contForEditDate.classList.add('card-edit__description', 'card-edit__description_date-wrap');
        cardOfProduct.append(contForEditDate);
        const nameOfEditDate = document.createElement('div');
        nameOfEditDate.innerText = `Date: `;
        contForEditDate.append(nameOfEditDate);
        const editDate = document.createElement('div');
        editDate.id = 'editDateOfNewProduct';
        editDate.innerText = `${new Date().toLocaleDateString()}`;
        editDate.classList.add('card-edit__input-edit-style_wrap');
        contForEditDate.append(editDate);

        /* редактирование карты (с валидацией) */
        let cardValidation = {
            name: true,
            article: true,
            count: true,
            price: true,
        };

        editPictureOfNewProduct.addEventListener('change', (event) => {
            const resultPicture = event.target.value;
            oldCard.img = resultPicture;
            if (event.target.value === undefined) picture.innerHTML = `<img src='./pictures/rdr2.jpg' width = 100% height = 100%>`;
        });

        editNameOfNewProduct.addEventListener('change', (event) => {
            const resultName = event.target.value;
            oldCard.name = resultName;
            if (event.target.value.length < 5) {
                cardValidation.name = false;
                warningEditName.style.display = 'block';
            } else {
                cardValidation.name = true;
                warningEditName.style.display = 'none';
            };
        });

        editArticleOfNewProduct.addEventListener('change', (event) => {
            const resultArticle = event.target.value;
            oldCard.article = resultArticle;
            if (event.target.value.match(/[A-Z][0-9][0-9]/)) {
                cardValidation.article = true;
                warningEditArticle.style.display = 'none';
            } else {
                cardValidation.article = false;
                warningEditArticle.style.display = 'block';
            };
        });

        editCountOfNewProduct.addEventListener('change', (event) => {
            const resultCount = event.target.value;
            oldCard.count = resultCount;
            if (event.target.value < 1) {
                cardValidation.count = false;
                warningEditCount.style.display = 'block';
            } else {
                cardValidation.count = true;
                warningEditCount.style.display = 'none';
            };
        });

        editPriceOfNewProduct.addEventListener('change', (event) => {
            const resultPrice = event.target.value;
            oldCard.price = resultPrice;
            if (event.target.value > 1 && event.target.value < 50) picture.classList.add('card__frame-for-cheap');
            if (event.target.value >= 50 && event.target.value < 100) picture.classList.add('card__frame-for-optimal');
            if (event.target.value >= 100) picture.classList.add('card__frame-for-premium');
            if (event.target.value < 1) {
                cardValidation.price = false;
                warningEditPrice.style.display = 'block';
            } else {
                cardValidation.price = true;
                warningEditPrice.style.display = 'none';
            };
        });

        editDateOfNewProduct.addEventListener('change', (event) => {
            event.target.innerText = `${new Date().toLocaleDateString()}`;
        });

        /* кнопка OK */
        const contForButtons = document.createElement('div');
        contForButtons.classList.add('card-edit-buttons__description', 'card-edit-buttons__description_wrap');
        cardOfProduct.append(contForButtons);

        const okButton = document.createElement('input');
        okButton.type = 'button';
        okButton.id = 'okButton';
        okButton.value = 'OK';
        okButton.classList.add('card__edit-button', 'card__edit-button_wrap');
        contForButtons.append(okButton);
        okButton.addEventListener('click', () => {
            if (!Object.values(cardValidation).every(item => item === true)) return;
            renderList();
        });

        /* кнопка Delete */
        const deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.id = item.id;
        deleteButton.value = 'Delete';
        deleteButton.classList.add('card__edit-button', 'card__edit-button_wrap');
        contForButtons.append(deleteButton);

        deleteButton.addEventListener('click', event => {
            event.preventDefault();
            elemForDelete = deleteButton.id;

            const filteredModel = arrayOfCards.filter((item) => {
                return item.id != elemForDelete ? true : false;
            });
            arrayOfCards = filteredModel;
            elemForDelete = null;
            renderList();
        });
    });
});