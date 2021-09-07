
const header = ()=>{
    const  menuBtn = document.querySelector('.toggle-button'),
    menu = document.querySelector('.navigation ul');

    menuBtn.addEventListener('click',()=>{
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');    
        }else{
            menu.classList.add('show');
        }
    });
}

document.addEventListener('DOMContentLoaded',header);