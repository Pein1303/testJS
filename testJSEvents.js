'use strict'

/* заполнение инпутов главного поля информации (с валидацией) */
let formValidation = {
    name: false,
    article: false,
    count: false,
    price: false,
};

nameOfNewProduct.addEventListener('change', (event) => {
    card.name = event.target.value;
    if (event.target.value.length < 5) {
        formValidation.name = false;
        warningName.style.display = 'block';
    } else {
        formValidation.name = true;
        warningName.style.display = 'none';
    };
});

articleOfNewProduct.addEventListener('change', (event) => {
    card.article = event.target.value;
    if (event.target.value.match(/[A-Z][0-9][0-9]/)) {
        formValidation.article = true;
        warningArticle.style.display = 'none';
    } else {
        formValidation.article = false;
        warningArticle.style.display = 'block';
    };
});

countOfNewProduct.addEventListener('change', (event) => {
    card.count = event.target.value;
    if (event.target.value < 1) {
        formValidation.count = false;
        warningCount.style.display = 'block';
    } else {
        formValidation.count = true;
        warningCount.style.display = 'none';
    };
});

priceOfNewProduct.addEventListener('change', (event) => {
    card.price = event.target.value;
    if (event.target.value < 1) {
        formValidation.price = false;
        warningPrice.style.display = 'block';
    } else {
        formValidation.price = true;
        warningPrice.style.display = 'none';
    };
});

dateOfNewProduct.addEventListener('change', (event) => {
    card.date = event.target.value;
});

/* сбор коллекции ценового сегмента */
const radioButtonsPriceSegment = document.getElementsByName('priceSegment');
radioButtonsPriceSegment.forEach(elem => {
    elem.addEventListener('change', (event) => {
        card.frameColor = event.target.value;
    });
});

/* заполнение поля второстетпенной информации */
linkForPicture.addEventListener('change', (event) => {
    card.img = event.target.value;
});

descriptionArea.addEventListener('change', (event) => {
    card.desc = event.target.value;
});

/* нажатие кнопки submit */
const form = document.forms[0];
submitButton.addEventListener('click', (event) => {
    if (!Object.values(formValidation).every(item => item === true)) return;
    event.preventDefault();
    arrayOfCards.push(card);
    card = {};
    renderList();
    form.reset();
});

/* рендер */
const renderList = (model = arrayOfCards) => {
    cardForm.innerHTML = '';
    if (!model.length) model = arrayOfCards;
    model.forEach(item => {
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

        if (item.desc != undefined) {

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
};

/* поиск */
searchProduct.addEventListener('input', (event) => {
    const searchedCards = arrayOfCards.filter(item => {
        if (item.name.toLocaleLowerCase().startsWith(event.target.value.toLocaleLowerCase())) {

            sortByAlphabet.addEventListener('change', () => {
                const sortedCards = searchedCards.sort((a, b) => {
                    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                        return 1;
                    };
                    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                        return -1;
                    };
                    return 0;
                });
                renderList(sortedCards);
            });

            sortByPrice.addEventListener('change', () => {
                const sortedCards = searchedCards.sort((a, b) => {
                    if (a.price > b.price) {
                        return 1;
                    };
                    if (a.price < b.price) {
                        return -1;
                    };
                    return 0;
                });
                renderList(sortedCards);
            });

            sortByCount.addEventListener('change', () => {
                const sortedCards = searchedCards.sort((a, b) => {
                    if (a.count > b.count) {
                        return 1;
                    };
                    if (a.count < b.count) {
                        return -1;
                    };
                    return 0;
                });
                renderList(sortedCards);
            });

            sortByDate.addEventListener('change', () => {
                const sortedCards = searchedCards.sort((a, b) => {
                    let aDate = new Date(a.date).getTime();
                    let bDate = new Date(b.date).getTime();
                    if (aDate > bDate) {
                        return 1;
                    };
                    if (aDate < bDate) {
                        return -1;
                    };
                    return 0;
                });
                renderList(sortedCards);
            });
            return true;
        } else {
            return false;
        };
    });
    renderList(searchedCards);
});

/* фильрация по ценовой категории */
document.getElementsByName('filterByPriceSegment').forEach((item, index, array) => {
    item.addEventListener('change', () => {
        let checkedValues = [];
        array.forEach(item => {
            if (item.checked) {
                checkedValues.push(item.value);
            };
        });

        let arrayOfPriceSegment = [];
        for (let i = 0; i < arrayOfCards.length; i++) {
            if (checkedValues.includes(arrayOfCards[i].frameColor)) {
                arrayOfPriceSegment.push(arrayOfCards[i]);
            };
        };

        renderList(arrayOfPriceSegment);

        sortByAlphabet.addEventListener('change', () => {
            const sortedCards = arrayOfPriceSegment.sort((a, b) => {
                if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                    return 1;
                };
                if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                    return -1;
                };
                return 0;
            });
            renderList(sortedCards);
        });

        sortByPrice.addEventListener('change', () => {
            const sortedCards = arrayOfPriceSegment.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                };
                if (a.price < b.price) {
                    return -1;
                };
                return 0;
            });
            renderList(sortedCards);
        });

        sortByCount.addEventListener('change', () => {
            const sortedCards = arrayOfPriceSegment.sort((a, b) => {
                if (a.count > b.count) {
                    return 1;
                };
                if (a.count < b.count) {
                    return -1;
                };
                return 0;
            });
            renderList(sortedCards);
        });

        sortByDate.addEventListener('change', () => {
            const sortedCards = arrayOfPriceSegment.sort((a, b) => {
                let aDate = new Date(a.date).getTime();
                let bDate = new Date(b.date).getTime();
                if (aDate > bDate) {
                    return 1;
                };
                if (aDate < bDate) {
                    return -1;
                };
                return 0;
            });
            renderList(sortedCards);
        });
    });
});

/* фильтрация по алфавиту */
sortByAlphabet.addEventListener('change', () => {
    const sortedCards = arrayOfCards.sort((a, b) => {
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
        };
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
        };
        return 0;
    });
    renderList(sortedCards);
});

/* фильтрация по цене */
sortByPrice.addEventListener('change', () => {
    const sortedCards = arrayOfCards.sort((a, b) => {
        if (a.price > b.price) {
            return 1;
        };
        if (a.price < b.price) {
            return -1;
        };
        return 0;
    });
    renderList(sortedCards);
});

/* фильтрация по количеству */
sortByCount.addEventListener('change', () => {
    const sortedCards = arrayOfCards.sort((a, b) => {
        if (a.count > b.count) {
            return 1;
        };
        if (a.count < b.count) {
            return -1;
        };
        return 0;
    });
    renderList(sortedCards);
});

/* фильтрация по дате */
sortByDate.addEventListener('change', () => {
    const sortedCards = arrayOfCards.sort((a, b) => {
        let aDate = new Date(a.date).getTime();
        let bDate = new Date(b.date).getTime();
        if (aDate > bDate) {
            return 1;
        };
        if (aDate < bDate) {
            return -1;
        };
        return 0;
    });
    renderList(sortedCards);
});