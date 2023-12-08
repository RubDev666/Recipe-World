// =================================== NAVBAR TOGGLE =================== 
const btnNav = document.querySelector('.btnNav');
const btnIcon = document.querySelector('.icons');

btnNav.addEventListener('click', () => {
    btnIcon.classList.toggle('fa-bars');
    btnIcon.classList.toggle('fa-times');

    btnIcon.classList.toggle('rotate');
})

// =================================== FOOOTER YEAR ===================
document.getElementById('year').textContent = new Date().getFullYear();
