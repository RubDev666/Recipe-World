import { urlDrink, urlMeal } from "./api-urls.js";
import { showCategories, showRecipes, showModal } from "../functions/recipes-functions.js";
import { cleanHtml, noResults } from "../helpers/dom-functions.js";

export function getCategories(url: string, selectElement: HTMLSelectElement) {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => showCategories(resultado.categories ?? resultado.drinks, selectElement))
};

export function getRecipes(category: string, url: string, typeRecipe: string) {
    if (category !== 'Categories') {
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => showRecipes(resultado.drinks ?? resultado.meals, category, typeRecipe))
    } else {
        const resultado = document.querySelector('#resultado') as HTMLDivElement;

        cleanHtml(resultado);

        resultado.appendChild(noResults('Select a category to display recipes.'));
    }
};

export function getRecipe(type: string, id: string) {
    if (type === 'meal') {
        const url = urlMeal.recipe + id;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => showModal(resultado.meals[0], type))
    } else if (type === 'drink') {
        const url = urlDrink.recipe + id;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => showModal(resultado.drinks[0], type))
    }
};