"use strict";

window.addEventListener('DOMContentLoaded', function() {
    
    // CТИЛИЗАЦИЯ ВЫПАДАЮЩЕГО СПИСКА

    let selectParent = document.querySelectorAll('.form__item')[4],
        select0 = selectParent.getElementsByTagName('select')[0],
        select = document.createElement('div'), // флекс-контейнер
        selectText = document.createElement('div'), // флекс-блок с тектом

        selectArrow = document.createElement('div'), // флекс блок (блок для картинки)
        selectArrowIco = document.createElement('div'), // картинка

        optionList = document.createElement('div'),
        option1 = document.createElement('div'),
        option2 = document.createElement('div'),
        option3 = document.createElement('div'),
        option = [];
    
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
        function changestyle() {
            if (bool) {
                selectArrowIco.style.background = 'url(../img/arrow_up.png) center center/cover no-repeat';
                optionList.style.display = 'block';
                select.style.borderBottomLeftRadius = '0px';
                select.style.borderBottomRightRadius = '0px';
                select.style.borderBottom = '2px solid black';
                return false;
            } else {
                selectArrowIco.style.background = 'url(../img/arrow_down.png) center center/cover no-repeat';
                optionList.style.display = 'none';
                select.style.borderBottomLeftRadius = '';
                select.style.borderBottomRightRadius = '';
                select.style.borderBottom = '';
                return true;
            }
        }
        bool = changestyle();
        return bool;
    });
    // Делаем лист
    optionList.classList.add('option');
    function addOption(...arr) {  // элементы попадают в функцию в качестве массива
        for (let key in arr) {
            arr[key].classList.add('option__item');
            optionList.appendChild(arr[key]);
            if (key == 0) {
                arr[key].textContent = "Молодой";
            } else if (key == 1) {
                arr[key].textContent = "Старый";
            } else if (key == 2) {
                arr[key].textContent = "Супер старый";
            }
        }
        return arr;
    }
    option = addOption(option1, option2, option3);
    // Обработчик событий для элементов листа
    optionList.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('option__item')) {
            clearStyle();
            e.target.style.backgroundColor = '#7a956b';
            selectText.textContent = e.target.textContent;
            optionList.style.display = 'none';
            selectArrowIco.style.background = 'url(../img/arrow_down.png) center center/cover no-repeat';
            select.style.borderBottomLeftRadius = '';
            select.style.borderBottomRightRadius = '';
            select.style.borderBottom = '';
            bool = true;
            return bool;
        }   
    });
    function clearStyle() {
        for (let i = 0; i < option.length; i++) {
            option[i].style.backgroundColor = 'white';
        }                
           
    }
});

