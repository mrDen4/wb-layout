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
        modalPay.classList.add('modal-active');
    })
});

buttonsChangeDelivery.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        modalDelivery.classList.add('modal-active');
    })
});

modal.forEach((item) => {
    let buttonModalExit = item.querySelector('.modal__exit');
    let modal = item;
    let enter = item.querySelector('.modal__enter');
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-active')) {
            e.target.classList.remove('modal-active')
        }
    })
    enter.addEventListener('click', (e) => {
        modal.classList.remove('modal-active')
        e.preventDefault();
    })

    buttonModalExit.addEventListener('click', (e) => {
        modal.classList.remove('modal-active')
        e.preventDefault();
    })
})