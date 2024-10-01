export default function loader(){
    const loader = document.querySelector('.loader');
        
    // Loader 

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(()=>{
            loader.style.display = 'none'
        }, 2000)
    }, 1500); 
}
