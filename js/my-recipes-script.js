import { mostrarRecetas, limpiarHtml, noResults } from "./helpers.js";
 
function initApp() {
    //const resultado = document.querySelector('#resultado');

    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    if (favoritos.length) {
        //para reutilizar el codigo en 3 paginas diferentes, es necesario que reciba estos argumentos como undefined, aqui en esta pagina FAVORITE, no requerimos los argumentos restantes, por eso pasamos undefined, y asi ahorramos codigo en validaciones o reescribirlo.
        mostrarRecetas(favoritos, undefined, undefined);
    } else {
        limpiarHtml(resultado);

        resultado.appendChild(noResults("You don't have favorite recipes yet"));
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
