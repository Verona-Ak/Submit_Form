"use strict";

window.addEventListener('DOMContentLoaded', function() {
    
    // CТИЛИЗАЦИЯ ВЫПАДАЮЩЕГО СПИСКА

    const parents = document.querySelectorAll('.form__item'),
        selectParent = document.querySelectorAll('.form__item')[4],
        select0 = selectParent.getElementsByTagName('select')[0],
        select = document.createElement('div'), // флекс-контейнер
        selectText = document.createElement('div'), // флекс-блок с тектом

        selectArrow = document.createElement('div'), // флекс блок (блок для картинки)
        selectArrowIco = document.createElement('div'), // картинка

        optionList = document.createElement('div'),
        option1 = document.createElement('div'),
        option2 = document.createElement('div'),
        option3 = document.createElement('div');
    let option = [];
    
    // Убираем текущий выпадающий список
    select0.style.display = 'none';
    
    // Добавляем внутрь родителя два блока
    selectParent.appendChild(select); 
    selectParent.appendChild(optionList);

    // Настройка select
    select.classList.add('select');
    select.style.cssText = `background-color: #ffff; display: flex; 
    justify-content: space-between; align-items: center;`;

    // Добавление и настройка текста в select
    select.appendChild(selectText);
    selectText.classList.add('select__text');
    selectText.style.cssText = `color: black; width: 50%;`;

    // Добавление и настойка стрелки в select
    select.appendChild(selectArrow); // помещаем блок со стрелой в блок select
    selectArrow.classList.add('select__arrow');
    selectArrow.appendChild(selectArrowIco); //помещаем стрелку в её блок
    selectArrowIco.classList.add('select__ico');

    // Вешаем обработчик события на стрелку 
    let bool = true;
    selectArrowIco.addEventListener('click', function(e) {
        bool = changestyle();
        function changestyle() {
            if (bool) {
                closeOrOpen_OptionList('img/arrow_up.png','block', '0px', '2px solid black');
                return false;
            } else {
                closeOrOpen_OptionList('img/arrow_down.png','none', '', '');
                return true;
            }
        }
        return bool;
    });
    function closeOrOpen_OptionList(pic, display, radius, borderBottom) {
        selectArrowIco.style.background = `url(${pic}) center center/cover no-repeat`;
        optionList.style.display = display;
        select.style.borderBottomLeftRadius = radius;
        select.style.borderBottomRightRadius = radius;
        select.style.borderBottom = borderBottom;
    }

    // Делаем лист
    optionList.classList.add('option');
    function addOption(...arr) {  // элементы попадают в функцию в качестве массива
        for (let key in arr) {
            arr[key].classList.add('option__item');
            optionList.appendChild(arr[key]);
            arr[key].textContent = '';
            if (key == 0) {
                arr[key].textContent += "Молодой";
            } else if (key == 1) {
                arr[key].textContent += "Старый";
            } else if (key == 2) {
                arr[key].textContent += "Супер старый";
            }
        }
        return arr;
    }
    option = addOption(option1, option2, option3);

    // Обработчик событий для элементов листа
    optionList.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('option__item')) {
            clearStyle();
            closeOrOpen_OptionList('img/arrow_down.png','none', '', '', '');
            e.target.style.backgroundColor = '#7a956b';
            selectText.textContent = e.target.textContent;
            
            bool = true;
            return bool;
        }   
    });
    function clearStyle() {
        for (let i = 0; i < option.length; i++) {
            option[i].style.backgroundColor = 'white';
        }                   
    }


    // НАСТРАИВАЕМ ОТПРАВКУ ФОРМЫ
    const form = document.getElementById('form'),
        checkbox = document.getElementsByClassName('checkbox__input')[0],
        err = document.createElement('div'); //блок с ошибкой для чекбокса

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        let index = () => {
            const labels = document.querySelectorAll('label'),
                forName = document.querySelectorAll('#formName')[0],
                formEmail = document.querySelectorAll('#formEmail')[0];
            for (let i = 0; i < labels.length; i++) {
                if (labels[i].classList.contains('error') || forName.value == '' || formEmail.value == '') {
                    return false;
                } else {
                    return true;
                }
            }
        };
        if (index()) {
            if (checkbox.checked) {
                let formData = new FormData(form);
                formData.append('image', formImage.files[0]);
                
                form.classList.add('_sending');

                let response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                    
                });
                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);
                    formPreview.innerHTML = '';
                    form.reset();
                    form.classList.remove('_sending');

                } else {
                    alert("Ошибка");
                    form.classList.remove('_sending');
                }
            } else{
                createdError("Необходимо согласие");
            }
        } 
        
    });
    
    function createdError(str) {
        parents[parents.length-1].appendChild(err);
        err.classList.add('err');
        err.style.cssText = `margin-top: 5px; font-size: 12px;
        color: red;`;
        err.textContent = str;
    }
    checkbox.addEventListener('change', function(e) {
        if(this.checked) {
            err.style.display = 'none';
        }
    });



    // ВАЛИДАЦИЯ ФОРМЫ
    function valodateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                email: {
                    required: true,
                    email: true,
                }, 
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите хотя бы {0} символа!")
                },
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введён адрес почты"
                }, 
            }
    
        });
    }
    valodateForms(form);

    // НАСТРОЙКА ИНПУТА С ОТПРАВКОЙ ФАЙЛА
    const formImage = document.getElementById('formImage'),
        formPreview = document.getElementById('formPreview');
    
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });
    function uploadFile(file) {
        if(!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
            alert('Разрешены только изображения');
            formImage.value = '';
            return;
        }
        if(file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть менее 2 МБ');
            return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="photo">`;
        };
        reader.onerror = function(e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }
});

