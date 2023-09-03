let allProducts = [];
let totalPrice = 0;
let totalSalePrice = 0;
let totalSale = 0;
let totalCount = 0;

let numberWithSpacing = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

let sumTotal = () => {
    let productsTotalPrice = document.querySelector('.price__text--total-price');
    let productsTotalSalePrice = document.querySelector('.price__text--total-sale-price');
    let productsTotalSale = document.querySelector('.price__text--total-sale');
    let productsTotalCount = document.querySelector('.price__text--total-count');
    let productsAccordionInfo = document.querySelector('.goods__accordion--products .goods__info');

    totalPrice = allProducts.reduce((acc, current) => {
        if (current.checked == true) {
            return acc + current.price * current.count
        }
        return acc
    }, 0);

    totalSalePrice = allProducts.reduce((acc, current) => {
        if (current.checked == true) {
            return acc + current.salePrice * current.count
        }
        return acc
    }, 0);

    totalCount = allProducts.reduce((acc, current) => {
        if (current.checked == true) {
            return acc + current.count
        }
        return acc
    }, 0);

    productsTotalPrice.innerHTML = `${numberWithSpacing(totalPrice)} сом`;
    productsTotalSalePrice.innerHTML = `${numberWithSpacing(totalSalePrice)} сом`;
    productsTotalSale.innerHTML = `${numberWithSpacing(totalPrice - totalSalePrice)} сом`;
    productsAccordionInfo.innerHTML = `${totalCount} товаров · ${numberWithSpacing(totalSalePrice)} сом`
    productsTotalCount.innerHTML = `${totalCount} товаров`
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
    let inputChecked = () => {
        if (product.checked) {
            return `<input type="checkbox" class="check__input" checked>`
        } else {
            return `<input type="checkbox" class="check__input">`
        }
    }
    let productTotal = () => {
        if (totalSalePrice >= 1000000) {
            return `<p class="product__total-price-sale product__total-price-sale--big">${numberWithSpacing(totalSalePrice)} <span>сом</span></p>`
        } else {
            return `<p class="product__total-price-sale">${numberWithSpacing(totalSalePrice)} <span>сом</span></p>`
        }
    }
    let totalSalePrice = product.salePrice * product.count;
    let totalPrice = product.price * product.count;
    return `
    <li class="products__product product" data-id=${product.id}>
        <label class="product__check check">
            ${inputChecked()}
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
                            <p class="product__company-modal-text">ОГРН: ${product.ogrnCompany}</p>
                            <p class="product__company-modal-text">${product.addressCompany}</p>
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
                ${productTotal()}
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

let generateMissingProduct = (product) => {
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
    return `
    <li class="products__product product" data-id=${product.id}>
        <div class="product__info">
            <img src="${product.img}" alt="${product.title}" class="product__info-img">
            <div class="product__info-about"> 
                <h3 class="product__title">${product.title}</h3>
                <div class="product__additional">
                    ${color()}
                    ${size()}
                </div>
            </div>
        </div>
        <div class="product__action">
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
    </li>
    `;
}

let parseProducts = (data) => {
    allProducts = data
    let productsListMissingInfo = document.querySelector('.goods__accordion--products-missing .goods__title');
    let countMissingProducts = 0;
    allProducts.forEach((item) => {
        let productsList = document.querySelector('.goods__products--in');
        let productsListMissing = document.querySelector('.goods__products--missing');
        if (item.productsLeft > 0) {
            productsList.insertAdjacentHTML('beforeend', generateProduct(item));
        } else {
            productsListMissing.insertAdjacentHTML('beforeend', generateMissingProduct(item));
            countMissingProducts += 1
        }
    })
    productsListMissingInfo.innerHTML = `Отсутствуют · ${countMissingProducts} товаров`
}

let addEventsForProducts = () => {
    // Add eventListner for plus button count
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

                    sumTotal();
                    addProductsDelivery(allProducts);
                    changeTotalBtn();
                }
            })
    
            if (productCount.value == 2) {
                minusBtn.disabled = false
            }
        })
    })
    
    // Add eventListner for minus button count
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

                        sumTotal();
                        addProductsDelivery(allProducts);
                        changeTotalBtn();
                    }
                })
    
                if (productCount.value == 1) {
                    item.disabled = true
                }
            }
    
        })
    })
    
    // Add eventListner for input count
    let inputCountProduct = document.querySelectorAll('.product__action-count-text');
    
    inputCountProduct.forEach((item) => {
        let productId = item.closest('.product').getAttribute('data-id');
        let productSalePrice = item.closest('.product__price').querySelector('.product__total-price-sale');
        let productPrice = item.closest('.product__price').querySelector('.product__total-price');
    
        item.addEventListener('input', (e) => {
            let value = e.target.value;
            let checkbox = e.currentTarget.closest('.product').querySelector('.check__input');
            allProducts.forEach((item) => {
                if (item.id == productId) {
                    if (value <= item.productsLeft && value > 0) {
                        item.count = +value
                        let price = item.price * item.count;
                        let salePrice = item.salePrice * item.count;
    
                        productSalePrice.innerHTML = `${numberWithSpacing(salePrice)} сом`
                        productPrice.innerHTML = `${numberWithSpacing(price)} сом`

                        if (checkbox.checked) {
                            sumTotal(price, salePrice)
                            addProductsDelivery(allProducts);
                            changeTotalBtn();
                        }
                    } else {
                        e.target.value = item.count
                    }
                }
            })
        })
    })

    //Add event for products checkbox
    let checkboxProduct = document.querySelectorAll('.product .check__input');

    checkboxProduct.forEach((item) => {
        let productId = item.closest('.product').getAttribute('data-id');

        item.addEventListener('change', (e) => {
            if (e.target.checked) {
                allProducts.forEach((item) => {
                    if (item.id == productId) {
                        item.checked = true
                    }
                })

                sumTotal()
                addProductsDelivery(allProducts);
                changeTotalBtn();
            } else {
                allProducts.forEach((item) => {
                    if (item.id == productId) {
                        item.checked = false
                    }
                })

                sumTotal()
                addProductsDelivery(allProducts);
                changeTotalBtn();
            }
            
        })
    })
}

let changeTotalBtn = () => {
    let totalCheckboxInput = document.querySelector('.total .total__item-time .check__input');
    let totalOrderBtn = document.querySelector('.total .total__order');

    totalCheckboxInput.addEventListener('change', (e) => {
        if (e.target.checked) {
            totalOrderBtn.innerHTML = `${numberWithSpacing(totalSalePrice)} сом`
        } else {
            totalOrderBtn.innerHTML = 'Заказать'
        }
    })
}

let getAllProducts = () => {
    fetch ('./data/products.json')
    .then(res => res.json())
    .then(data => parseProducts(data.products))
    .then(() => addEventsForProducts())
    .then(() => sumTotal())
    .then(() => changeTotalBtn())
}

getAllProducts();