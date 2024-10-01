export default function clas(){
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
