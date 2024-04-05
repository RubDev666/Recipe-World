import { showRecipes } from "./functions/recipes-functions.js";
import { cleanHtml, noResults } from "./helpers/dom-functions.js";
import { getLocalStorage } from "./functions/localStorage-actions.js";

function initApp() {
    const favoritos = getLocalStorage();

    if(favoritos.length) {
        showRecipes(favoritos, undefined, undefined);
    } else {
        const resultado = document.querySelector('#resultado') as HTMLDivElement;

        cleanHtml(resultado);

        resultado.appendChild(noResults("You don't have favorite recipes yet"));
    }
}

document.addEventListener('DOMContentLoaded', initApp);