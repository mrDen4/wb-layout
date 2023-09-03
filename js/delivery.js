let addressDelivery = {};
let creditCards = [];
let deliveryAddressText = document.querySelector('.delivery__list-item .delivery__item-text--address');
let deliveryAddressRating = document.querySelector('.delivery__list-item .delivery__item-rating');
let deliveryAddressOpenningHours = document.querySelector('.delivery__list-item .delivery__item-time');
let deliveryAddressPrice = document.querySelector('.delivery__list-item .delivery__item-text--price');
let deliveryList = document.querySelector('.modal--delivery .modal__content-address');
let deliveryAddressTextTotal = document.querySelector('.total .total__item-info .total__info-text');


let getClientInfo = () => {
    fetch ('./data/client.json')
        .then(res => res.json())
        .then(data => parseClientInfo(data))
        .then(() => createDeliveryCheckedInfo())
        .then(() => generateDeliveryPickupList())
        .then(() => addEventsForDelivery())
        .then(() => addProductsDelivery(allProducts))
        .then(() => addPaymentElements())
        .then(() => changePaymentCard())
}

let parseClientInfo = (data) => {
    addressDelivery = data.addressDelivery;
    creditCards = data.creditCards;
}

let createDeliveryCheckedInfo = () => {
    addressDelivery.pickup.forEach(item => {
        if (item.checked) {
            generateDeliveryCheckedInfo(item)
        }
    });
}

let generateDeliveryCheckedInfo = (info) => {
    deliveryAddressText.innerHTML = info.address;
    deliveryAddressRating.innerHTML = info.rating;
    deliveryAddressOpenningHours.innerHTML = info.openningHours;
    deliveryAddressPrice.innerHTML = info.price;
    deliveryAddressTextTotal.innerHTML = info.address;
}

let generateDeliveryPickupList = () => {
    addressDelivery.pickup.forEach((item) => {
        deliveryList.insertAdjacentHTML('beforeend', generateDeliveryPickupItem(item));
    });

    checkedTypeButton();
}

let checkedTypeButton = () => {
    let pickupBtn = document.querySelector('.modal--delivery input[id=pickup]');
    let courierBtn = document.querySelector('.modal--delivery input[id=courier]');

    if (addressDelivery.typeDelivery == 'pickup') {
        pickupBtn.checked = true
        courierBtn.checked = false
    } else if (addressDelivery.typeDelivery == 'courier'){
        pickupBtn.checked = false
        courierBtn.checked = true
    }
}

let generateDeliveryPickupItem = (info) => {
    let checkbox = () => {
        if (info.checked) {
            return `<input type="radio" class="radio__input" id="${info.id}" name="address" checked>`
        } else {
            return `<input type="radio" class="radio__input" id="${info.id}" name="address">`
        }
    }
    return `
    <label class="modal__radio radio">
        ${checkbox()}
        <span class="radio__box"></span>
        ${info.address}
        <button class="radio__delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#A0A0A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#A0A0A4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#A0A0A4"/>
            </svg>
        </button>
    </label>
    `
}

let addEventsForDelivery = () => {
    let modalEnterBtn = document.querySelector('.modal--delivery .modal__enter');

    modalEnterBtn.addEventListener('click', (e) => {
        let inputId = e.currentTarget.parentNode.querySelector('.radio__input:checked').id;

        addressDelivery.pickup.forEach(elem => {
            if (elem.id == inputId) {
                elem.checked = true
                generateDeliveryCheckedInfo(elem)
            } else {
                elem.checked = false
            }
        })
    })
}

let generateProducts = (product, count) => {
    let productCount = () => {
        if (product.count > 1) {
            return `<div class="delivery__item-count">${count}</div>`
        } else {
            return ``
        }
    }
    
    return `
    <li class="delivery__item-product">
        <img src="${product.img}" alt="${product.title}">
        ${productCount()}
    </li>
    `
}

let generateDeliveryListProducts = (date) => {
    return `
    <li class="delivery__list-item delivery__list-item--date" data-date="${date}">
        <h3 class="delivery__item-title">${date}</h3>
        <div class="delivery__item-info">
            <ul class="delivery__item-products">
                
            </ul>
        </div>
    </li>
    `
}

let addProductsDelivery = (products) => {
    let deliveryList = document.querySelector('.content__delivery .delivery__list');
    let date = []
    let productLeftCount = {}

    let deliveryListItem = deliveryList.querySelectorAll('.delivery__list-item--date');

    deliveryListItem.forEach(item => deliveryList.removeChild(item))

    allProducts.forEach(item => item.productsToOrder.forEach(el => {
        if (!date.includes(el.date)) {
            date.push(el.date)
        }
    }))

    date.forEach(item => {
        deliveryList.insertAdjacentHTML('beforeend', generateDeliveryListProducts(item));

        let deliveryListItem = deliveryList.querySelector(`[data-date="${item}"]`);
        let deliveryDateList = deliveryList.querySelector(`[data-date="${item}"] .delivery__item-products`);

        products.forEach(product => {
            let productMaxCount = product.productsToOrder.find(el => {
                if (el.date == item) {
                    return el
                } else {
                    return null
                }
            })?.count;

            if (product.productsLeft > 0 && product.productsToOrder.find(el => el.date == item) && product.checked) {
                if (product.count <= productMaxCount && productLeftCount[product.id] != 0) {
                    deliveryDateList.insertAdjacentHTML('beforeend', generateProducts(product, product.count))
                    productLeftCount[product.id] = 0
                } else if (productLeftCount[product.id]) {
                    deliveryDateList.insertAdjacentHTML('beforeend', generateProducts(product, productLeftCount[product.id]))
                } else  if (!productLeftCount[product.id] && product.count > productMaxCount){
                    deliveryDateList.insertAdjacentHTML('beforeend', generateProducts(product, productMaxCount))
                    productLeftCount[product.id] = product.count - productMaxCount
                }
            }
        })

        if (deliveryDateList.children.length == 0) {
            deliveryList.removeChild(deliveryListItem);
        }
    })
} 

getClientInfo();