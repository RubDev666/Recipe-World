import { obtenerCategorias, obtenerRecetasCategorias } from "./helpers.js";
 
function initApp() {
    const selectCategorias = document.querySelector('#categorias');
    //const resultado = document.querySelector('#resultado');

    obtenerCategorias('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', selectCategorias);

    selectCategorias.addEventListener('change', seleccionarCategoria);

    function seleccionarCategoria(e) {
        const categoria = e.target.value;
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}`;

        obtenerRecetasCategorias(categoria, url, 'drink');
    }
}

document.addEventListener('DOMContentLoaded', initApp);

// =================================== BTN BACK TO TOP ================
const btnBackTop = document.querySelector('.btn-back-top');
let screen = 0;

window.addEventListener('scroll', () => {
    if (window.scrollY > 200 & window.scrollY < screen) {
        btnBackTop.classList.add('show');
    } else {
        btnBackTop.classList.remove('show');
    }

    screen = window.scrollY;
});

btnBackTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
});