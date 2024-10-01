export default function timer(id, deadline){
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

