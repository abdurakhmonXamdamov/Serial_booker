import clas from '../modules/clas';
import carousel from '../modules/carousel';
import form from '../modules/form';
import loader from '../modules/loader';
import modall from '../modules/modall';
import tabs from '../modules/tab';
import timer from '../modules/timer';
import { openModal } from '../modules/modall.js';

window.addEventListener('DOMContentLoaded', () => {
    
    const openInterval = setTimeout(()=>{
        openModal('.modal', openInterval)
    }, 4000)

    clas();
    carousel({
        container:'.offer__slider',
        slider: '.offer__slide',
        leftArr: '.offer__slider-prev',
        rightArr: '.offer__slider-next',
        currentVal: 'current',
        totalVal: 'total',
        slideWrap: '.offer__slider-wrapper',
        slideIn: '.offer__slider-inner'
    });
    form(openInterval);
    loader();
    modall('[data-modal]', '.modal', openInterval);
    tabs();
    timer('.timer', '2025-02-16');

});
