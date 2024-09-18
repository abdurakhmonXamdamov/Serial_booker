window.addEventListener('DOMContentLoaded', ()=>{

    const tabheaderParent = document.querySelector('.tabheader__items'),
        tabheaderItems = document.querySelectorAll('.tabheader__item'),
        tabContents = document.querySelectorAll('.tabcontent')


        function hideContent(){
            tabContents.forEach((items) => {
                items.classList.remove('show', 'fade')
                items.classList.add('hide')
            })
            tabheaderItems.forEach(tabs => tabs.classList.remove('tabheader__item_active'))
        }

        function showContent(ind = 0){
            tabContents[ind].classList.add('show', 'fade')
            tabContents[ind].classList.remove('hide')
            tabheaderItems[ind].classList.add('tabheader__item_active')

        }

        hideContent()
        showContent()

        tabheaderParent.addEventListener('click', (e)=>{
            const target = e.target
            if(target.classList.contains('tabheader__item')){
                tabheaderItems.forEach((item, idx) =>{
                   if(target == item){
                    hideContent()
                    showContent(idx)
                   }
                })
            }
        })
})
