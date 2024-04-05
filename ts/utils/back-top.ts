const btnBackTop = document.querySelector('.btn-back-top') as HTMLButtonElement;

let screenInit: number = 0;

window.addEventListener('scroll', (): void => {
    if (window.scrollY > 200 && window.scrollY < screenInit) {
        btnBackTop.classList.add('show');
    } else {
        btnBackTop.classList.remove('show');
    }

    screenInit = window.scrollY;
});

btnBackTop.addEventListener('click', function (): void {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
});