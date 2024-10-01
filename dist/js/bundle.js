/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/carousel.js":
/*!*********************************!*\
  !*** ./src/modules/carousel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ carousel)
/* harmony export */ });
function carousel({
    container,
    slider,
    rightArr,
    leftArr,
    currentVal,
    totalVal,
    slideWrap,
    slideIn
}){
    // Carousel Slider

    const slides = document.querySelectorAll(slider),
    right = document.querySelector(rightArr),
    left = document.querySelector(leftArr),
    current = document.getElementById(currentVal),
    total = document.getElementById(totalVal),
    sliderWrapper = document.querySelector(slideWrap),
    sliderInner = document.querySelector(slideIn),
    width = parseInt(window.getComputedStyle(sliderWrapper).width),
    parentSlider = document.querySelector(container);

    let slideIdx = 1
    let calcSlider = 0

    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.display = 'flex'
    sliderWrapper.style.overflow = 'hidden'
    sliderInner.style.transition = '.4s ease all'

    slides.forEach(slide =>{
        slide.style.width = width + 'px';
    })

    if(slides.length < 10){
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIdx}`
    }else{
        total.textContent = slides.length;
        current.textContent = slideIdx
    }

    const indicator = document.createElement('ol')
    indicator.classList.add('caroules-indicator')
    parentSlider.append(indicator)
    
    const dotsMassive = []

    for(let i = 0; i<slides.length; i++){
        const dots = document.createElement('li')
        dots.setAttribute('data-slide', i + 1)
        dots.className = 'caroules-dots'
        indicator.append(dots)
        dotsMassive.push(dots)
        if(i == 0) dots.style.opacity = '1'
    }

    right.addEventListener('click', ()=>{
        if(calcSlider == width * (slides.length - 1)){
            calcSlider = 0
        }else{
            calcSlider += width
        }

        sliderInner.style.transform = `translateX(-${calcSlider}px)`

        if(slideIdx == slides.length){
            slideIdx = 1
        }else{
            slideIdx++
        }

        if(slides.length < 10){
            current.textContent = `0${slideIdx}`
        }else{
            current.textContent = slideIdx
        }

        dotsMassive.forEach(dot => dot.style.opacity = '.5')
        dotsMassive[slideIdx-1].style.opacity = '1'
    })

    left.addEventListener('click', ()=>{
        if(calcSlider == 0){
            calcSlider = width * (slides.length - 1)
        }else{
            calcSlider -= width
        }

        sliderInner.style.transform = `translateX(-${calcSlider}px)`

        if(slideIdx == 1){
            slideIdx = slides.length
        }else{
            slideIdx--
        }

        if(slides.length < 10){
            current.textContent = `0${slideIdx}`
        }else{
            current.textContent = slideIdx
        }

        dotsMassive.forEach(dot => dot.style.opacity = '.5')
        dotsMassive[slideIdx-1].style.opacity = '1'
    })

    dotsMassive.forEach(data =>{
        data.addEventListener('click', (e)=>{
            const slideTo = e.target.getAttribute('data-slide')

            slideIdx = slideTo;
            calcSlider = width * (slideTo - 1)
            sliderInner.style.transform = `translateX(-${calcSlider}px)`
            
            if(slides.length < 10){
                current.textContent = `0${slideIdx}`
            }else{
                current.textContent = slideIdx
            }
            
            dotsMassive.forEach(dot => dot.style.opacity = '.5')
            dotsMassive[slideIdx-1].style.opacity = '1'
        })
    })
}


/***/ }),

/***/ "./src/modules/clas.js":
/*!*****************************!*\
  !*** ./src/modules/clas.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ clas)
/* harmony export */ });
function clas(){
     // adding Cards by implementing Class's

     class CardMenu{
        constructor(img, alt, title, text, price, parentCardHolder, ...classEs){
            this.img = img
            this.alt = alt
            this.title = title
            this.text = text
            this.price = price
            this.parentHolder = document.querySelector(parentCardHolder) 
            this.classEs = classEs
            this.USD = 12500
            this.changer() 
        }

        changer(){
            this.price = this.price * this.USD;
        }

        render(){
            const elDiv = document.createElement('div')

            if(this.classEs.length == 0){
                this.elDiv = 'menu__item'
                elDiv.classList.add(this.elDiv)
            }else{
                this.classEs.forEach(className =>{
                    elDiv.classList.add(className)
                })
            }

            elDiv.innerHTML = `
                    <img src=${this.img} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">
                    ${this.text}
                    </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> Uzs/month</div>
                    </div>
                `
            this.parentHolder.append(elDiv);
        }
    }

    //* Axios code

    axios.get('http://localhost:3000/menu').then((data)=>{
        data.data.forEach(({img, altimg, title, desc, price}) =>{
                new CardMenu(img, altimg, title, desc, price, ".menu .container").render()
            })
    })

    //* This is the same as above code I just try to do it with axios third library. 

    // async function getResource(url){
    //     const res = await fetch(url)
    //     return await res.json()
    // }

    // getResource('http://localhost:3000/menu').then(data =>{
    //     data.forEach(({img, altimg, title, desc, price}) =>{
    //         new CardMenu(img, altimg, title, desc, price, ".menu .container").render()
    //     })
    // })

}


/***/ }),

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ form)
/* harmony export */ });
/* harmony import */ var _modall__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modall */ "./src/modules/modall.js");


function form(openInterval) {
    const forms = document.querySelectorAll('form');

    forms.forEach((item) => {
        bindData(item);
    });

    const msg = {
        loading: '../img/spinner.svg',
        success: 'Thanks for filling out the form',
        failure: 'Something went wrong'
    };

    async function postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: data
        });

        return res.json();
    }

    function bindData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitting = document.createElement('img');
            submitting.src = msg.loading;
            submitting.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(submitting);

            const inputs = form.querySelectorAll('input');
            const obj = {};

            inputs.forEach((input) => {
                obj[input.getAttribute('name')] = input.value;
            });

            postData('http://localhost:3000/request', JSON.stringify(obj))
                .then((res) => {
                    console.log(res);
                    showThanksModal(msg.success);
                    submitting.remove();
                })
                .catch(() => {
                    showThanksModal(msg.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        (0,_modall__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', openInterval); // Using openModal here

        const responseMod = document.createElement('div');
        responseMod.classList.add('modal__dialog');

        responseMod.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(responseMod);
        setTimeout(() => {
            responseMod.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            (0,_modall__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); // Using closeModal here
        }, 3500);
    }
}


/***/ }),

/***/ "./src/modules/loader.js":
/*!*******************************!*\
  !*** ./src/modules/loader.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loader)
/* harmony export */ });
function loader(){
    const loader = document.querySelector('.loader');
        
    // Loader 

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(()=>{
            loader.style.display = 'none'
        }, 2000)
    }, 1500); 
}


/***/ }),

/***/ "./src/modules/modall.js":
/*!*******************************!*\
  !*** ./src/modules/modall.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (/* binding */ modaal),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
// Export openModal and closeModal functions
function closeModal(modalSelectors) {
    const modal = document.querySelector(modalSelectors);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = 'unset';
}

function openModal(modalSelectors, openInterval) {
    const modal = document.querySelector(modalSelectors);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (openInterval) {
        clearTimeout(openInterval);
    }
}

function modaal(modalOpeners, modalSelectors, openInterval) {
    const modalOpenersElems = document.querySelectorAll(modalOpeners);
    const modal = document.querySelector(modalSelectors);

    modalOpenersElems.forEach(open => {
        open.addEventListener('click', () => openModal(modalSelectors, openInterval));
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelectors);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelectors);
        }
    });

    function showModalScroll() {
        if (document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight) {
            openModal(modalSelectors, openInterval);
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    window.addEventListener('scroll', showModalScroll);
}


/***/ }),

/***/ "./src/modules/tab.js":
/*!****************************!*\
  !*** ./src/modules/tab.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tab)
/* harmony export */ });
function tab(){
    
    // Tab_Content 
    
    const tabheaderParent = document.querySelector('.tabheader__items'),
        tabheaderItems = document.querySelectorAll('.tabheader__item'),
        tabContents = document.querySelectorAll('.tabcontent');

    function hideTableContent(){
        tabContents.forEach((items)=>{
            items.classList.add('hide')
            items.classList.remove('show', 'fade')
        })

        tabheaderItems.forEach((item) => item.classList.remove('tabheader__item_active'))
    }

    function showTableContent(index = 0){
        tabContents[index].classList.add('show', 'fade')
        tabContents[index].classList.remove('hide')
        tabheaderItems[index].classList.add('tabheader__item_active')
    }

    hideTableContent()
    showTableContent()

    tabheaderParent.addEventListener('click', (e)=>{
        const target = e.target;

        if(target.classList.contains('tabheader__item')){
            tabheaderItems.forEach((item, idx) => {
                if(target == item){
                    hideTableContent()
                    showTableContent(idx)
                }
            })
        }
    })
}



/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timer)
/* harmony export */ });
function timer(id, deadline){
    // Timer 

    function getTimeRemaning(endTime){

        let days, hours, minutes, seconds;
        const timer = Date.parse(endTime) - new Date()

        if(timer <= 0){
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;
        }
        else{
            days = Math.floor(timer / (24 * 60 * 60 * 1000))
            hours = Math.floor((timer / (60 * 60 * 1000))  % 24)
            minutes = Math.floor((timer / (60 * 1000))  % 60)
            seconds = Math.floor((timer / 1000)  % 60)
        }


        return {
            timer, 
            days, 
            hours,
            minutes,
            seconds   
        }
    }

    function takeZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`
        }else{
            return num
        }
    }

    function setTime(selector, endTime){
        const timeBlock = document.querySelector(selector),
            days = timeBlock.querySelector('#days'),
            hours = timeBlock.querySelector('#hours'),
            minutes = timeBlock.querySelector('#minutes'),
            seconds = timeBlock.querySelector('#seconds'),
            timeInterVal = setInterval(updateTime, 1000)

            updateTime()

        function updateTime(){
            const timeHold = getTimeRemaning(endTime)

            days.innerHTML = takeZero(timeHold.days)
            hours.innerHTML = takeZero(timeHold.hours)
            minutes.innerHTML = takeZero(timeHold.minutes)
            seconds.innerHTML = takeZero(timeHold.seconds)

            if(timeHold.timer <= 0){
                clearInterval(timeInterVal)
            }
        }
    }

    setTime(id, deadline)
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/JS/app.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_clas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/clas */ "./src/modules/clas.js");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/carousel */ "./src/modules/carousel.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/form */ "./src/modules/form.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/loader */ "./src/modules/loader.js");
/* harmony import */ var _modules_modall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/modall.js */ "./src/modules/modall.js");
/* harmony import */ var _modules_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/tab */ "./src/modules/tab.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/timer */ "./src/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {
    
    const openInterval = setTimeout(()=>{
        (0,_modules_modall__WEBPACK_IMPORTED_MODULE_4__.openModal)('.modal', openInterval)
    }, 4000)

    ;(0,_modules_clas__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_carousel__WEBPACK_IMPORTED_MODULE_1__["default"])({
        container:'.offer__slider',
        slider: '.offer__slide',
        leftArr: '.offer__slider-prev',
        rightArr: '.offer__slider-next',
        currentVal: 'current',
        totalVal: 'total',
        slideWrap: '.offer__slider-wrapper',
        slideIn: '.offer__slider-inner'
    });
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])(openInterval);
    (0,_modules_loader__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_modall__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', openInterval);
    (0,_modules_tab__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2025-02-16');

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map