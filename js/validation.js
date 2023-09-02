//Validation form

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
           if (validateMail(value) && value.length != 0) {
                addError('Проверьте адрес электронной почты', name)
            } else {
                deleteError(name)
            }
        } else if (name === 'phone') {
            if (value.length < 12 && value.length != 0) {
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