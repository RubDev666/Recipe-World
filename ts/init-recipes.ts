import { urlDrink, urlMeal } from "./api/api-urls.js";
import { getCategories, getRecipes } from "./api/api-actions.js";

function initApp() {
    const path = window.location.pathname.includes('meals');

    const selectCategorias = document.querySelector('#categorias') as HTMLSelectElement;
 
    getCategories(path ? urlMeal.categories : urlDrink.categories, selectCategorias);

    selectCategorias.addEventListener('change', seleccionarCategoria);

    function seleccionarCategoria(e: Event) {
        const category = e.target as HTMLOptionElement;

        const urlRecipes = path ? urlMeal.recipes : urlDrink.recipes;

        const url = urlRecipes + category.value;

        getRecipes(category.value, url, path ? 'meal' : 'drink');
    }
}

document.addEventListener('DOMContentLoaded', initApp);