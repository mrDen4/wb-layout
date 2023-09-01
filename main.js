// Accordions
let accordionProducts = document.querySelector('.goods__accordion--products');
let accordionProductsMissing = document.querySelector('.goods__accordion--products-missing');
let products = document.querySelector('.goods__products--in');
let productsMissing = document.querySelector('.goods__products--missing');

accordionProducts.addEventListener('click', (e) => {
    e.preventDefault();
    products.classList.toggle('goods__products--hide');
    accordionProducts.classList.toggle('goods__accordion--products-hide');
})

accordionProductsMissing.addEventListener('click', (e) => {
    e.preventDefault();
    productsMissing.classList.toggle('goods__products--hide');
    accordionProductsMissing.classList.toggle('goods__accordion--productsmissing-hide');
})

// Popups
let buttonChangePayContent = document.querySelector('.payment__top-change');
let buttonChangePayTotal = document.querySelector('.total__item--card .total__top-change');
let buttonChangeDeliveryContent = document.querySelector('.delivery__top-change');
let buttonChangeDeliveryTotal = document.querySelector('.total__item--delivery .total__top-change');

let modal = document.querySelectorAll('.modal');
let modalPay = document.querySelector('.modal--pay');
let modalDelivery = document.querySelector('.modal--delivery');

let buttonsChangePay = [buttonChangePayContent, buttonChangePayTotal]
let buttonsChangeDelivery = [buttonChangeDeliveryContent, buttonChangeDeliveryTotal]

buttonsChangePay.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        modalPay.classList.toggle('modal-active');
    })
});

buttonsChangeDelivery.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        modalDelivery.classList.toggle('modal-active');
    })
});

modal.forEach((item) => {
    item.addEventListener('click', (e) => {
        let buttonModalExit = e.currentTarget.querySelector('.modal__exit');
        let modal = e.currentTarget;
        let enter = e.currentTarget.querySelector('.modal__enter');

        e.preventDefault();

        enter.addEventListener('click', () => {
            modal.classList.remove('modal-active')
        })

        buttonModalExit.addEventListener('click', () => {
            modal.classList.remove('modal-active')
        })

        if (e.target.classList.contains('modal-active')) {
            e.target.classList.remove('modal-active')
        }
    })
})

//Recipient form validation

let formLabel = document.querySelectorAll('.recipient__form-label');

let addError = (text, inputName) => {
    let itemInput = document.querySelector(`input[name=${inputName}]`);
    let itemLabel = itemInput.parentNode;
    let itemError = itemLabel.querySelector('.recipient__form-error');

    itemInput.classList.add('recipient__form-inp--error');
    itemError.classList.add('recipient__form-error--active');
    itemError.innerText = text
}

let validateMail = (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return (!re.test(String(value).toLowerCase()))
} 

let validateEmptyForm = (name, value) => {
    if (name === 'firstName' && value == '') {
        addError('Укажите имя', name)
    } else if (name === 'lastName' && value == '') {
        addError('Укажите фамилию', name)
    } else if (name === 'email' && value == '') {
        addError('Укажите электронную почту', name)
    } else if (name === 'phone' && value == '') {
        addError('Укажите телефон', name)
    } else if (name === 'inn' && value == '') {
        addError('Укажите ИНН', name)
    }
}

formLabel.forEach((item) => {
    let itemInput = item.querySelector('.recipient__form-inp');
    let itemPlaceholder = item.querySelector('.recipient__form-placeholder');
    let itemError = item.querySelector('.recipient__form-error');

    let deleteError = () => {
        itemInput.classList.remove('recipient__form-inp--error');
        itemError.classList.remove('recipient__form-error--active');
        itemError.innerText = ''
    }

    let validateForm = (name, value) => {
        if (name === 'firstName' && value.length > 0) {
            deleteError(name)
        } else if (name === 'lastName' && value.length > 0) {
            deleteError(name)
        } else if (name === 'email') {
           if (validateMail(value)) {
                addError('Проверьте адрес электронной почты', name)
            } else {
                deleteError(name)
            }
        } else if (name === 'phone') {
            if (value.length < 12) {
                addError('Формат: +9 999 999 99 99', name)
            } else {
                deleteError(name)
            }
        } else if (name === 'inn') {
            if (value.length != 14 && value.length != 0) {
                addError('Проверьте ИНН', name)
            } else {
                deleteError(name)
            }
        }
    }

    itemInput.addEventListener('focusin', () => {
        itemPlaceholder.classList.add('recipient__form-placeholder--active');
    })

    itemInput.addEventListener('focusout', () => {
        validateForm(itemInput.name, itemInput.value.trim())
    })

    itemInput.addEventListener('input', (e) => {
        let itemName = e.target.name;
        let itemValue = e.target.value;
        let itemError = e.target.parentNode.querySelector('.recipient__form-error--active');

        if (itemError) {
            validateForm(itemName, itemValue);
        }
    })
})

//Phone Validation
let itemInputPhone = document.querySelector('input[name=phone]');

let getInputNumbersValue = (input) => {
    return input.value.replace(/\D/g, '');
}

let onPhoneInput = (e) => {
    let input = e.target,
    inputNumbersValue = getInputNumbersValue(input),
    selectionStart = input.selectionStart,
    formattedInputValue = '';

    if (!inputNumbersValue) {
        return input.value = '';
    }

    if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
            input.value = inputNumbersValue;
        }
        return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
        let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
        formattedInputValue = input.value = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
    } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
}

let onPhoneKeyDown = function (e) {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
    }
}

let onPhonePaste = function (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue;
            return;
        }
    }
}

itemInputPhone.addEventListener('keydown', onPhoneKeyDown)
itemInputPhone.addEventListener('input', onPhoneInput)
itemInputPhone.addEventListener('paste', onPhonePaste)

let orderButton = document.querySelector('.total__order');

orderButton.addEventListener('click', (e) => {
   e.preventDefault();

   formLabel.forEach((item) => {
        let itemInput = item.querySelector('.recipient__form-inp');
        let itemPlaceholder = item.querySelector('.recipient__form-placeholder');
        let itemError = item.querySelector('.recipient__form-error');
        let itemInputName = itemInput.name;

        validateEmptyForm(itemInputName, itemInput.value);

   })
})


//Products
let allProducts = [
    {
        'id': 1,
        'img': '/images/products/1.jpg',
        'title': 'Футболка UZcotton мужская',
        'color': 'белый',
        'size': '56',
        'company': 'Коледино WB',
        'titleCompany': 'OOO Вайлдберриз',
        'ogrnCompany': '5167746237148',
        'addressCompany': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        'count': 1,
        'productsLeft': 2,
        'price': 1051,
        'salePrice': 522,
    },
    {
        'id': 2,
        'img': '/images/products/2.jpg',
        'title': 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        'color': 'прозрачный',
        'company': 'Коледино WB',
        'titleCompany': 'OOO Мегапрофстиль',
        'ogrnCompany': '5167746237148',
        'addressCompany': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        'productsLeft': 200,
        'count': 200,
        'price': 11500,
        'salePrice': 10500,
    },
    {
        'id': 3,
        'img': '/images/products/3.jpg',
        'title': 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные,Faber-Castell ',
        'company': 'Коледино WB',
        'titleCompany': 'OOO Вайлдберриз',
        'ogrnCompany': '5167746237148',
        'addressCompany': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        'count': 2,
        'productsLeft': 2,
        'price': 475,
        'salePrice': 247,
    },
]

let numberWithSpacing = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

let sumTotal = (products) => {
    let totalPrice = 0;
    let totalSalePrice = 0;
    let totalProducts = 0;
    products.forEach((item) => {

    })
}

// Show products
let generateProduct = (product) => {
    let size = () => {
        if (product.size) {
            return `<p class="product__text"><span class="product__text-title">Размер:</span> <span class="product__text-size">${product.size}</span></p>`
        } else {
            return ``
        }
    }
    let color = () => {
        if (product.color) {
            return `<p class="product__text">Цвет: ${product.color}</p>`
        } else {
            return ``
        }
    }
    let productsLeft = () => {
        if (product.productsLeft < 5) {
            return `<p class="product__action-text">Осталось ${product.productsLeft} шт.</p>`
        } else {
            return ``
        }
    }
    let minusBtn = () => {
        if (product.count == 1) {
            return `<button class="product__action-count-btn product__action-count-btn--minus" disabled>−</button>`
        } else {
            return `<button class="product__action-count-btn product__action-count-btn--minus">−</button>`
        }
    }
    let plusBtn = () => {
        if (product.count == product.productsLeft) {
            return `<button class="product__action-count-btn product__action-count-btn--plus" disabled>+</button>`
        } else {
            return `<button class="product__action-count-btn product__action-count-btn--plus">+</button>`
        }
    }
    let totalSalePrice = product.salePrice * product.count;
    let totalPrice = product.price * product.count;
    return `
    <li class="products__product product" data-id=${product.id}>
        <label class="product__check check">
            <input type="checkbox" class="check__input">
            <span class="check__box"></span>
        </label>
        <div class="product__info">
            <img src="${product.img}" alt="${product.title}" class="product__info-img">
            <div class="product__info-about"> 
                <div class="product__total">
                    <p class="product__total-price-sale">${totalSalePrice} <span>сом</span></p>
                    <p class="product__total-price">${totalPrice} сом</p>
                </div>
                <h3 class="product__title">${product.title}</h3>
                <div class="product__additional">
                    ${color()}
                    ${size()}
                </div>
                <div class="product__company">
                    <p class="product__text product__text--company">${product.company}</p>
                    <div class="product__company-row">
                        <p class="product__text product__text--company">${product.titleCompany}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="7.5" stroke="#A0A0A4"/>
                            <path d="M9.88867 7.58691C9.62826 7.58691 9.41504 7.51042 9.24902 7.35742C9.08301 7.20117 9 7.01074 9 6.78613C9 6.55501 9.08301 6.36621 9.24902 6.21973C9.41504 6.07324 9.62826 6 9.88867 6C10.1523 6 10.3656 6.07324 10.5283 6.21973C10.6943 6.36621 10.7773 6.55501 10.7773 6.78613C10.7773 7.02051 10.6943 7.21257 10.5283 7.3623C10.3656 7.51204 10.1523 7.58691 9.88867 7.58691ZM10.6504 13.3779H9.10742V8.37793H10.6504V13.3779Z" fill="#A0A0A4"/>
                        </svg>
                        <div class="product__company-modal">
                            <h3 class="product__company-modal-title">${product.titleCompany}</h3>
                            <p class="product__company-modal-text">ОГРН: ${product.ogrn}</p>
                            <p class="product__company-modal-text">${product.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="product__price">
            <div class="product__action">
                <div class="product__action-count">
                    ${minusBtn()}
                    <input type="text" class="product__action-count-text" value="${product.count}">
                    ${plusBtn()}
                </div>
                ${productsLeft()}
                <div class="product__action-row">
                    <button class="product__action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 4.05857C2.26589 4.75224 1.76684 5.83284 1.99493 7.42928C2.22332 9.02783 3.26494 10.6852 4.80436 12.3478C6.25865 13.9184 8.10962 15.4437 9.99996 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.735 10.6852 17.7766 9.02783 18.005 7.4293C18.233 5.83285 17.734 4.75224 16.9659 4.05856C16.1766 3.34572 15.055 3 14 3C12.1319 3 11.0923 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1582 5.04882 9.84166 5.04882 9.6464 4.85355C9.59641 4.80356 9.54182 4.7466 9.48224 4.68443C8.90757 4.08479 7.86797 3 5.99995 3C4.94495 3 3.82325 3.34573 3.03396 4.05857ZM2.36371 3.31643C3.37369 2.40427 4.75202 2 5.99995 2C8.07123 2 9.34539 3.11257 9.99996 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2668 5.66715 18.9949 7.5707C18.7233 9.47217 17.5149 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87773 18.0333 9.69995 17.9C7.69353 16.3952 5.66443 14.7485 4.0706 13.0272C2.48503 11.3148 1.27665 9.47217 1.00498 7.57072C0.733012 5.66716 1.33249 4.24776 2.36371 3.31643Z" fill="black"/>
                        </svg>
                    </button>
                    <button class="product__action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="product__total">
                <p class="product__total-price-sale">${numberWithSpacing(totalSalePrice)} <span>сом</span></p>
                <p class="product__total-price">${numberWithSpacing(totalPrice)} сом</p>
                <div class="product__total-modal">
                    <div class="product__total-modal-row">
                        <p class="product__total-modal-title">Скидка 55%</p>
                        <p class="product__total-modal-text">−300 сом</p>
                    </div>
                    <div class="product__total-modal-row">
                        <p class="product__total-modal-title">Скидка покупателя 10%</p>
                        <p class="product__total-modal-text">−30 сом</p>
                    </div>
                </div>
            </div>
        </div>
    </li>
    `;
}

allProducts.forEach((item) => {
    let productsList = document.querySelector('.goods__products--in');
    productsList.insertAdjacentHTML('beforeend', generateProduct(item));
})

let plusCountBtn = document.querySelectorAll('.product__action-count-btn--plus');

plusCountBtn.forEach((item) => {
    let productId = item.closest('.product').getAttribute('data-id');
    let productCount = item.parentNode.querySelector('input');
    let minusBtn = item.parentNode.querySelector('.product__action-count-btn--minus');
    let productSalePrice = item.closest('.product__price').querySelector('.product__total-price-sale');
    let productPrice = item.closest('.product__price').querySelector('.product__total-price');

    item.addEventListener('click', (e) => {
        e.preventDefault();
        productCount.value = +productCount.value + 1

        allProducts.forEach((product) => {
            if (product.id == productId) {
                product.count += 1

                productSalePrice.innerHTML = `${numberWithSpacing(product.salePrice * product.count)} сом`
                productPrice.innerHTML = `${numberWithSpacing(product.price * product.count)} сом`

                if (product.count == product.productsLeft) {
                    item.disabled = true
                }
            }
        })

        if (productCount.value == 2) {
            minusBtn.disabled = false
        }
    })
})

let minusCountBtn = document.querySelectorAll('.product__action-count-btn--minus');

minusCountBtn.forEach((item) => {
    let productId = item.closest('.product').getAttribute('data-id');
    let productCount = item.parentNode.querySelector('input');
    let plusBtn = item.parentNode.querySelector('.product__action-count-btn--plus');
    let productSalePrice = item.closest('.product__price').querySelector('.product__total-price-sale');
    let productPrice = item.closest('.product__price').querySelector('.product__total-price');

    item.addEventListener('click', (e) => {
        e.preventDefault();

        if (productCount.value != 1) {
            productCount.value = +productCount.value - 1

            allProducts.forEach((item) => {
                if (item.id == productId) {
                    item.count -= 1
    
                    productSalePrice.innerHTML = `${numberWithSpacing(item.salePrice * item.count)} сом`
                    productPrice.innerHTML = `${numberWithSpacing(item.price * item.count)} сом`

                    if (item.count != item.productsLeft) {
                        plusBtn.disabled = false
                    }
                }
            })

            if (productCount.value == 1) {
                item.disabled = true
            }
        }

    })
})

let inputCountProduct = document.querySelectorAll('.product__action-count-text');

inputCountProduct.forEach((item) => {
    let productId = item.closest('.product').getAttribute('data-id');
    let productSalePrice = item.closest('.product__price').querySelector('.product__total-price-sale');
    let productPrice = item.closest('.product__price').querySelector('.product__total-price');

    item.addEventListener('input', (e) => {
        let value = e.target.value;
        allProducts.forEach((item) => {
            if (item.id == productId) {
                if (value <= item.productsLeft) {
                    item.count = value

                    productSalePrice.innerHTML = `${numberWithSpacing(item.salePrice * item.count)} сом`
                    productPrice.innerHTML = `${numberWithSpacing(item.price * item.count)} сом`
                } else {
                    e.target.value = item.count
                }

            }
        })
    })
})