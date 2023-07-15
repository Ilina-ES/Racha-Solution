let body = document.querySelector('body');
let modalSuccess = document.querySelector('.modal-cost-success');
let closeBtn = document.getElementById('success-close');
let adviceBlock = document.querySelector('.advice');


const fetchAPI = 'test/Api/'
const API_GET_INFO = 'https://api.github.com/users/yaroslavwd'

const openMenu = () => {
    let burgerMenu = document.querySelector('.b-menu');
    let burgerNav = document.querySelector('.nav__container');
    let itemLinks = document.querySelectorAll('.nav__item-link')

    const toggleClasses = (e) => {
        [burgerMenu, burgerNav].forEach(function (el) {
            el.classList.toggle('open');
        });
        body.classList.toggle('overflow')
    };

    burgerMenu.addEventListener('click', toggleClasses);
    for (let item of itemLinks) {
        item.addEventListener('click', toggleClasses)
    }
};

const showMainContent = () => {
    let showMoreBtn = document.querySelector('.header__circle-button')
    let menuPoint = document.querySelectorAll('.nav__item-link')
    let hiddenWrapper = document.querySelector('.hidden-wrapper');
    let nextBlock = document.querySelector('.about');

    function showMore (){
        if (hiddenWrapper.classList.contains('hidden-wrapper--show')) {
            nextBlock.scrollIntoView({block: "start", behavior: "smooth"});
        } else {
            hiddenWrapper.classList.add('hidden-wrapper--show');
            nextBlock.scrollIntoView({block: "start", behavior: "smooth"});
        }
    }

    showMoreBtn.addEventListener('click', showMore)

    menuPoint.forEach(item => {
        item.addEventListener('click', showMore)
    })



};

const openModalCost = () => {
    let button = document.querySelector(".header__button");
    let btnClose = document.querySelector('.close-btn');
    let modal = document.querySelector(".modal-cost");

    const toggleClasses = () => {
        body.classList.toggle('overflow--shadow')
        modal.classList.toggle('open')
    };

    button.addEventListener('click', toggleClasses)
    btnClose.addEventListener('click', toggleClasses)
}

const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);
const {requestRating} = document.forms;
const {adviceForm} = document.forms;

const retrieveFormValue = async (evt, form, urlApi) => {
    evt.preventDefault();
    const values = {};

    for (let field of form) {
        const {name} = field;

        if (name) {
            const {type, checked, value} = field;
            values[name] = isCheckboxOrRadio(type) ? checked : value;
        }
    }

    const response = await fetch ( urlApi , {
        method: 'POST',
        body: JSON.stringify(values)
    });

    if (response.ok) {
        console.log('Успешно');
    }
}


const success = (second) => {
    let modal = document.querySelector(".modal-cost");

    const toggleClasses = () => {
        modal.classList.toggle('open')
        modalSuccess.classList.toggle('show')
    };
        toggleClasses()

    closeBtn.addEventListener('click', function (){
        modalSuccess.classList.toggle('show')
        body.classList.toggle('overflow--shadow')
    })
}

const getCouncil = () => {
    adviceBlock.classList.add('advice--hidden');
    body.classList.toggle('overflow--shadow')
    modalSuccess.classList.toggle('show');

    closeBtn.addEventListener('click', function (){
        modalSuccess.classList.toggle('show')
        body.classList.toggle('overflow--shadow')
    })
}

const getInfoForm = () => {
    requestRating.addEventListener('submit', (evt) => retrieveFormValue(evt, requestRating, fetchAPI));
    adviceForm.addEventListener('submit', (evt) => retrieveFormValue(evt, adviceForm, fetchAPI));
    requestRating.addEventListener('submit', success);
    adviceForm.addEventListener('submit', getCouncil);
}

const getTechnologies = () => {

    let i = 1;
    for(let li of carousel.querySelectorAll('li')) {
        li.style.position = 'relative';
        li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
        i++;
    }

    let width = 320; 
    let count = 1; 

    let list = carousel.querySelector('ul');
    let listElems = carousel.querySelectorAll('li');

    let position = 0;

    carousel.querySelector('.prev').onclick = function() {
        position += width * count;
        position = Math.min(position, 0)
        list.style.marginLeft = position + 'px';
    };

    carousel.querySelector('.next').onclick = function() {
        position -= width * count;
        position = Math.max(position, -width * (listElems.length - count));
        list.style.marginLeft = position + 'px';
 };
}

 


document.addEventListener("DOMContentLoaded", function() {
    let windowWidth = window.screen.availWidth
    openModalCost();
    getInfoForm();
    getTechnologies();
    showMainContent();
    if(windowWidth <= 800) {
        openMenu();
    }
})
