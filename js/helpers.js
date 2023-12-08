//================================== EXPORT FUNCTIONS ===============
const modal = new bootstrap.Modal('#modal', {});

export function obtenerCategorias(url, selectContendor) {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarCategorias(resultado.categories ?? resultado.drinks, selectContendor))
}

function mostrarCategorias(categorias, selectCategorias) {
    categorias.forEach(categoria => {
        const { strCategory } = categoria;

        const option = document.createElement('OPTION');
        option.classList.add('bg-primary', 'text-light');
        option.value = strCategory;
        option.textContent = strCategory;

        selectCategorias.appendChild(option);
    })
}

export function obtenerRecetasCategorias(categoria, url, tipo) {
    if (categoria !== 'Categories') {
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetas(resultado.drinks ?? resultado.meals, categoria, tipo))
    } else {
        limpiarHtml(resultado);

        resultado.appendChild(noResults('Select a category to display recipes.'));
    }
}

//Para reutilizar este codigo, es necesario estos 3 argumentos, las recetas, categorias y tipo (bebidas o comidas)
export function mostrarRecetas(recetas, categoria, tipo) {
    limpiarHtml(resultado);

    //esto es para la pagina de "FAVORITES", cuando no haya recetas agregadas.
    if(recetas === 'no recipes') {
        resultado.appendChild(noResults("You don't have favorite recipes yet"));

        return;
    }

    const heading = document.createElement('H2');
    heading.classList.add('text-center', 'text-secondary', 'my-0');
    heading.textContent = categoria;

    const resultsText = document.createElement('P');
    resultsText.classList.add('text-light', 'fs-5', 'text-center');
    resultsText.textContent = recetas.length ? `Showing ${recetas.length} recipes` : 'No Results';

    if(categoria) {
        resultado.appendChild(heading);
    }

    resultado.appendChild(resultsText);

    recetas.forEach(receta => {
        const id = receta.idMeal ?? receta.idDrink ?? receta.id;
        const titulo = receta.strMeal ?? receta.strDrink ?? receta.titulo;
        const imgUrl = receta.strMealThumb ?? receta.strDrinkThumb ?? receta.imgUrl;
        const type = tipo ?? receta.tipo;

        const recetaContenedor = document.createElement('DIV');
        recetaContenedor.classList.add('mb-3', 'recipe-container');

        const recetaCard = document.createElement('DIV');
        recetaCard.classList.add('card-border');

        const recetaImagen = document.createElement('IMG');
        recetaImagen.classList.add('card-img-top');
        recetaImagen.alt = `Image recipe ${titulo}`;
        recetaImagen.src = imgUrl;

        const recetaCardBody = document.createElement('DIV');
        recetaCardBody.classList.add('card-body', 'd-flex', 'justify-content-center', 'flex-column', 'align-items-center', 'py-4', 'px-3');

        const recetaHeading = document.createElement('H3');
        recetaHeading.classList.add('card-title', 'py-3', 'text-center', 'fw-bold', 'text-light', 'fs-5');
        recetaHeading.textContent = titulo;

        const recetaButton = document.createElement('BUTTON');
        recetaButton.classList.add('btn-main', 'w-50', 'fs-6', 'py-2');
        recetaButton.textContent = 'See Recipe';

        recetaButton.onclick = function () {
            obtenerReceta({type, id});
        }

        recetaCardBody.appendChild(recetaHeading);
        recetaCardBody.appendChild(recetaButton);

        recetaCard.appendChild(recetaImagen);
        recetaCard.appendChild(recetaCardBody)

        recetaContenedor.appendChild(recetaCard);

        resultado.appendChild(recetaContenedor);
    })
}

function obtenerReceta(data) {
    if(data.type === 'meal') {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.id}`;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0], data.type))
    } else if(data.type === 'drink') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data.id}`;

        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarRecetaModal(resultado.drinks[0], data.type))
    }
}

function mostrarRecetaModal(receta, tipo) {
    //const { idMeal, strInstructions, strMeal, strMealThumb } = receta;
    const id = receta.idMeal ?? receta.idDrink;
    const titulo = receta.strMeal ?? receta.strDrink;
    const imgUrl = receta.strMealThumb ?? receta.strDrinkThumb;
    const strInstructions = receta.strInstructions;

    const modalTitle = document.querySelector('.modal .modal-title');
    modalTitle.textContent = titulo;

    const modalBody = document.querySelector('.modal .modal-body');
    limpiarHtml(modalBody);

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
    instructions.textContent = strInstructions;

    const ingredientsTitle = document.createElement('H3');
    ingredientsTitle.classList.add('my-3');
    ingredientsTitle.textContent = 'Ingredients and Quantities';

    const listGroup = document.createElement('UL');

    //algunos ingredientes vienen vacios, si hay algo itera y crea la lista
    for (let i = 1; i <= 20; i++) {
        if (receta[`strIngredient${i}`]) {
            const ingrediente = receta[`strIngredient${i}`];
            const cantidad = receta[`strMeasure${i}`];

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

    const modalFooter = document.querySelector('.modal-footer');
    modalFooter.classList.add('border-secondary')

    limpiarHtml(modalFooter);

    const btnFavorito = document.createElement('BUTTON');
    btnFavorito.classList.add(existeStorage(id) ? 'btn-red' : 'btn-main', 'col', 'py-2', 'col-lg-3', 'fw-bold');
    btnFavorito.textContent = existeStorage(id) ? 'Delete' : 'Save';

    const btnCerrarModal = document.createElement('BUTTON');
    btnCerrarModal.classList.add('btn-close-modal', 'col', 'py-2', 'col-lg-3', 'fw-bold');
    btnCerrarModal.textContent = 'Close';

    btnFavorito.onclick = function () {
        if(existeStorage(id)) {
            eliminarFavorito(id);

            btnFavorito.textContent = 'Save';

            mostrarToast('Removed Successfully');
            
            modal.hide();

            return
        }

        agregarFavorito({
            id,
            titulo,
            imgUrl,
            tipo
        });

        btnFavorito.textContent = 'Delete';
        btnFavorito.classList.remove('btn-main');
        btnFavorito.classList.add('btn-red');

        mostrarToast('Successfully Added');
    }

    btnCerrarModal.onclick = function () {
        modal.hide();
    }

    modalFooter.appendChild(btnFavorito);
    modalFooter.appendChild(btnCerrarModal);

    modal.show()
}

function existeStorage(id) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    // retorna un true, si encuentra un elemento con el id que le pasamos
    return favoritos.some(favorito => favorito.id === id);
}

function agregarFavorito(receta) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
}

function eliminarFavorito(id) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);

    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

    if(location.pathname === '/favorites.html') {
        mostrarRecetas(nuevosFavoritos.length ? nuevosFavoritos : 'no recipes', undefined, undefined);
    }
}

function mostrarToast(mensaje) {
    const toastDiv = document.querySelector('#toast');
    const toastBody = document.querySelector('.toast-body');

    const toast = new bootstrap.Toast(toastDiv);

    limpiarHtml(toastBody);

    const text = document.createElement('P');
    text.classList.add('fw-bold', 'fs-6', 'm-0');
    text.textContent = mensaje;

    toastBody.appendChild(text);

    toast.show();
}

export function noResults(message) {
    const selectCategories = document.createElement('P');
    selectCategories.classList.add('text-secondary', 'fs-2', 'my-4', 'text-center');
    selectCategories.textContent = message;

    return selectCategories;
}

export function limpiarHtml(selector) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}
