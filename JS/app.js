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
        modal.classList.toggle('show')
        document.body.style.overflow = 'unset'
    }

    function openModal(){
        modal.classList.toggle('show')
        // for making disappear scroll behaivor
        document.body.style.overflow = 'hidden'

        // for clearing setTimeout function in order to prevent opening modal second time if it is opened by user
        clearTimeout(openInterval)
    }

    const modalOpeners = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');

        modalOpeners.forEach(open =>{
            open.addEventListener('click', openModal)
        })

        modalClose.addEventListener('click', closeModal)

        modal.addEventListener('click', (e)=>{
            if(e.target == modal){
                closeModal()
            }
        })

        document.addEventListener('keydown', (e)=>{
            if(e.key == 'Escape' && modal.classList.contains('show')){
                closeModal()
            }
        })

    // const openInterval = setTimeout(openModal, 4500)

   
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
            
            this.classEs.forEach(classs =>{
                elDiv.classList.add(classs)
            })

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

    new CardMenu(
            "../img/Tabs/1.png",
            "vegy",
            'Plan “Usual”',
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
            10, 
            '.menu .container',
            "menu__item"
        ).render()

    new CardMenu(
            "../img/Tabs/2.jpg",
            "elite",
            'Plan “Premium”',
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?',
            15, 
            '.menu .container',
            "menu__item"
        ).render()

    new CardMenu(
            "../img/Tabs/3.jpg",
            "post",
            'Plan "VIP"',
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus natus nobis minus corporis atque enim vitae, modi eligendi commodi itaque voluptatum ipsum. Nemo reiciendis, id rem dolorum rerum consequuntur eos.',
            20, 
            '.menu .container',
            "menu__item"
        ).render()



})
