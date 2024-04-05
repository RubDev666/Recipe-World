import '../../scss/app.scss';
import 'bootstrap';

// =================================== NAVBAR TOGGLE =================== 
const btnNav = document.querySelector('.btnNav') as HTMLButtonElement;
const btnIcon = document.querySelector('.icons') as HTMLSpanElement;
 
btnNav.addEventListener('click', (): void => {
    btnIcon.classList.toggle('fa-bars');
    btnIcon.classList.toggle('fa-times');

    btnIcon.classList.toggle('rotate');
})

// =================================== FOOOTER YEAR ===================
const year = document.getElementById('year') as HTMLSpanElement;

year.textContent = new Date().getFullYear().toString();
