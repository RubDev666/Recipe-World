import { ApiType, RecipeArgument, ApiCategories, ShowModalType, RecipeType } from "../types/api-types";
import { getRecipe } from "../api/api-actions.js";
import { showToast, cleanHtml, noResults } from "../helpers/dom-functions.js";
import { addFavorite, existsStorage, deleteFavorite } from "./localStorage-actions.js";

import * as bootstrap from 'bootstrap';

export function showCategories<T extends ApiCategories>(categories: T[], selectElement: HTMLSelectElement) {
    categories.forEach((category: T) => {
        const { strCategory } = category;

        const option = document.createElement('OPTION') as HTMLOptionElement;
        option.classList.add('bg-primary', 'text-light');
        option.value = strCategory;
        option.textContent = strCategory;

        selectElement.appendChild(option);
    })
};

//Para reutilizar este codigo, es necesario estos 3 argumentos, las recetas, categorias y tipo (bebidas o comidas)
export function showRecipes<T extends RecipeArgument, A extends ApiType>(recipes: A[], category: T, typeRecipe: T) {
    const resultado = document.querySelector('#resultado') as HTMLDivElement;

    cleanHtml(resultado);

    //esto es para la pagina de "FAVORITES", cuando no haya recetas agregadas.
    if (typeRecipe === 'no recipes') {
        resultado.appendChild(noResults("You don't have favorite recipes yet"));

        return;
    }

    const heading = document.createElement('H2');

    if (category) {
        heading.classList.add('text-center', 'text-secondary', 'my-0');
        heading.textContent = category;

        resultado.appendChild(heading);
    }

    const resultsText = document.createElement('P');
    resultsText.classList.add('text-light', 'fs-5', 'text-center');
    resultsText.textContent = recipes.length ? `Showing ${recipes.length} recipes` : 'No Results';

    resultado.appendChild(resultsText);

    recipes.forEach((recipe: A) => {
        const id = recipe.idMeal ?? recipe.idDrink ?? recipe.id;
        const titulo = recipe.strMeal ?? recipe.strDrink ?? recipe.titulo;
        const imgUrl = recipe.strMealThumb ?? recipe.strDrinkThumb ?? recipe.imgUrl;
        const type = typeRecipe ?? recipe.tipo;

        const recetaContenedor = document.createElement('DIV');
        recetaContenedor.classList.add('mb-3', 'recipe-container');

        const recetaCard = document.createElement('DIV');
        recetaCard.classList.add('card-border');

        const recetaImagen = document.createElement('IMG') as HTMLImageElement;
        recetaImagen.classList.add('card-img-top');
        recetaImagen.alt = `Image recipe ${titulo}`;
        recetaImagen.src = imgUrl;

        const recetaCardBody = document.createElement('DIV');
        recetaCardBody.classList.add('card-body', 'd-flex', 'justify-content-center', 'flex-column', 'align-items-center', 'py-4', 'px-3');

        const recetaHeading = document.createElement('P');
        recetaHeading.classList.add('card-title', 'py-3', 'text-center', 'fw-bold', 'text-light', 'fs-5');
        recetaHeading.textContent = titulo;

        const recetaButton = document.createElement('BUTTON');
        recetaButton.classList.add('btn-main', 'w-50', 'fs-6', 'py-2');
        recetaButton.textContent = 'See Recipe';

        recetaButton.onclick = function () {
            getRecipe(type, id);
        }

        recetaCardBody.appendChild(recetaHeading);
        recetaCardBody.appendChild(recetaButton);

        recetaCard.appendChild(recetaImagen);
        recetaCard.appendChild(recetaCardBody)

        recetaContenedor.appendChild(recetaCard);

        resultado.appendChild(recetaContenedor);
    })
};

export function showModal(recipe: ShowModalType, type: string) {
    const modal = new bootstrap.Modal('#modal', {});

    const id = recipe.idMeal ?? recipe.idDrink;
    const titulo = recipe.strMeal ?? recipe.strDrink;
    const imgUrl = recipe.strMealThumb ?? recipe.strDrinkThumb;
    const strInstructions = recipe.strInstructions;

    console.log(recipe)

    const modalTitle = document.querySelector('.modal .modal-title') as HTMLElement;
    modalTitle.textContent = titulo;

    const modalBody = document.querySelector('.modal .modal-body') as HTMLElement;
    cleanHtml(modalBody);

    const imgContainer = document.createElement('DIV');
    imgContainer.classList.add('w-100', 'd-flex', 'img-modal-container');
    const imgRecipe = document.createElement('IMG');
    imgRecipe.classList.add('imgRecipe', 'm-auto');
    imgRecipe.setAttribute('src', imgUrl);
    imgRecipe.setAttribute('alt', 'recipe-' + titulo + '-img');
    imgContainer.appendChild(imgRecipe);

    const textContainer = document.createElement('DIV');
    textContainer.classList.add('textContainer');

    const instructionsTitle = document.createElement('H3');
    instructionsTitle.classList.add('my-3');
    instructionsTitle.textContent = 'Instructions';

    const instructions = document.createElement('P');
    if(strInstructions) {
        instructions.textContent = strInstructions;
    }
    
    const ingredientsTitle = document.createElement('H3');
    ingredientsTitle.classList.add('my-3');
    ingredientsTitle.textContent = 'Ingredients and Quantities';

    const listGroup = document.createElement('UL');

    //algunos ingredientes vienen vacios, si hay algo itera y crea la lista
    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`] as keyof RecipeType) {
            const ingrediente = recipe[`strIngredient${i}`] as keyof RecipeType;
            const cantidad = recipe[`strMeasure${i}`] as keyof RecipeType;

            const ingredienteLi = document.createElement('LI');
            ingredienteLi.classList.add('list-group-item');
            ingredienteLi.textContent = `${ingrediente} - ${cantidad}`

            listGroup.appendChild(ingredienteLi);
        }
    }

    textContainer.appendChild(ingredientsTitle);
    textContainer.appendChild(listGroup);
    textContainer.appendChild(instructionsTitle);
    textContainer.appendChild(instructions);

    modalBody.appendChild(imgContainer);
    modalBody.appendChild(textContainer);

    const modalFooter = document.querySelector('.modal-footer') as HTMLElement;
    modalFooter.classList.add('border-secondary')

    cleanHtml(modalFooter);

    const btnFavorito = document.createElement('BUTTON');
    btnFavorito.classList.add(existsStorage(id) ? 'btn-red' : 'btn-main', 'col', 'py-2', 'col-lg-3', 'fw-bold');
    btnFavorito.textContent = existsStorage(id) ? 'Delete' : 'Save';

    const btnCerrarModal = document.createElement('BUTTON');
    btnCerrarModal.classList.add('btn-close-modal', 'col', 'py-2', 'col-lg-3', 'fw-bold');
    btnCerrarModal.textContent = 'Close';

    btnFavorito.onclick = function () {
        if (existsStorage(id)) {
            deleteFavorite(id);

            btnFavorito.textContent = 'Save';

            showToast('Removed Successfully');

            modal.hide();

            return
        }

        addFavorite({
            id,
            titulo,
            imgUrl,
            tipo: type
        });

        btnFavorito.textContent = 'Delete';
        btnFavorito.classList.remove('btn-main');
        btnFavorito.classList.add('btn-red');

        showToast('Successfully Added');
    }

    btnCerrarModal.onclick = function () {
        modal.hide();
    }

    modalFooter.appendChild(btnFavorito);
    modalFooter.appendChild(btnCerrarModal);

    modal.show()
}
