// const { default: axios } = require("axios")

window.addEventListener('DOMContentLoaded', ()=>{

    const tabheaderParent = document.querySelector('.tabheader__items'),
        tabheaderItems = document.querySelectorAll('.tabheader__item'),
        tabContents = document.querySelectorAll('.tabcontent');
        
        let = loader = document.querySelector('.loader');
        
        
        // Loader 

        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(()=>{
                loader.style.display = 'none'
            }, 2000)
        }, 1500); 
        
        

    // Tab_Content 

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

    // Timer 

    const deadline = '2025-02-16'

    // console.log();

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

    setTime('.timer', deadline)

    // Modal

    function closeModal(){
        modal.classList.remove('show')
        modal.classList.add('hide')
        document.body.style.overflow = 'unset'
    }

    function openModal(){
        modal.classList.add('show')
        modal.classList.remove('hide')
        // for making disappear scroll behaivor
        document.body.style.overflow = 'hidden'
        // for clearing setTimeout function in order to prevent opening modal second time if it is opened by user
        clearTimeout(openInterval)
    }

    const modalOpeners = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal')

        modalOpeners.forEach(open =>{
            open.addEventListener('click', openModal)
        })

        modal.addEventListener('click', (e)=>{
            if(e.target == modal || e.target.getAttribute('data-close') == ''){
                closeModal()
            }
        })

        document.addEventListener('keydown', (e)=>{
            if(e.key == 'Escape' && modal.classList.contains('show')){
                closeModal()
            }
        })

    const openInterval = setTimeout(openModal, 4000)

   
    function showModalScroll(){
        if(document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight){
            openModal()
            window.removeEventListener('scroll', showModalScroll)
        }
    }

    // showModalScroll()
    window.addEventListener('scroll', showModalScroll);


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

        // Form 

        const form = document.querySelectorAll('form')

        form.forEach((items)=>{
            bindData(items)
        })

        const msg = {
            loading: '../img/spinner.svg',
            success: 'Thanks for filling our Form',
            failure: 'Something went Wrong'
        }

    async function postData(url, data){
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: data
        })

        return res.json();
    }


    function bindData(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            const submitting = document.createElement('img')
            submitting.src = msg.loading;
            submitting.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.append(submitting)

            const inputs = form.querySelectorAll('input'),
                obj = {};

            inputs.forEach((input)=>{
                obj[input.getAttribute('name')] = input.value;
            })

            postData('http://localhost:3000/request', JSON.stringify(obj))
            .then((res)=>{
                console.log(res);
                showThansModal(msg.success)
                submitting.remove();
            })
            .catch(()=>{
                showThansModal(msg.failure)
            })
            .finally(()=>{
                form.reset();
            })
            
        })
    }

        // Response Modal

    function showThansModal(message){
        const prevModal = document.querySelector('.modal__dialog')
        prevModal.classList.add('hide')
        openModal()

        const responseMod = document.createElement('div')
        responseMod.classList.add('modal__dialog')

        responseMod.innerHTML = `
                <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">
                    ${message}
                </div>
                </div>
        `
        document.querySelector('.modal').append(responseMod)
        setTimeout(() => {
            responseMod.remove()
            prevModal.classList.add('show')
            prevModal.classList.remove('hide')
            closeModal()
        }, 3500);
    }

    // Carousel Slider

    const slides = document.querySelectorAll('.offer__slide'),
        right = document.querySelector('.offer__slider-next'),
        left = document.querySelector('.offer__slider-prev'),
        current = document.getElementById('current'),
        total = document.getElementById('total'),
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        width = parseInt(window.getComputedStyle(sliderWrapper).width)

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
        })




})
