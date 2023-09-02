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


        enter.addEventListener('click', (e) => {
            modal.classList.remove('modal-active')
            e.preventDefault();
        })

        buttonModalExit.addEventListener('click', (e) => {
            modal.classList.remove('modal-active')
            e.preventDefault();
        })

        if (e.target.classList.contains('modal-active')) {
            e.target.classList.remove('modal-active')
        }
    })
})