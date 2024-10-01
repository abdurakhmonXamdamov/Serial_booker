export default function carousel({
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
