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
        }, 2000); 
        
        

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

        const timer = Date.parse(endTime) - new Date(),
        days = Math.floor(timer / (24 * 60 * 60 * 1000)),
        hours = Math.floor((timer / (60 * 60 * 1000))  % 24),
        minutes = Math.floor((timer / (60 * 1000))  % 60),
        seconds = Math.floor((timer / 1000)  % 60);

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

})
