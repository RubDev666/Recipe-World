import { FavoriteType } from "../types/api-types.js";
import { showRecipes } from "./recipes-functions.js";
import { ApiType } from "../types/api-types";

export function getLocalStorage(): ApiType[] | [] {
    const local = (localStorage.getItem('favoritos')) ?? [];

    let favoritos: [] = [];

    typeof local === 'string' && (favoritos = JSON.parse(local));

    return favoritos;
};

export function addFavorite(receta: FavoriteType) {
    const favoritos = getLocalStorage();

    localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
}

export function existsStorage(id: string): boolean {
    const favoritos = getLocalStorage();
    
    // retorna un true, si encuentra un elemento con el id que le pasamos
    return favoritos.some((favorito: FavoriteType) => favorito.id === id);
}

export function deleteFavorite(id: string) {
    const favoritos = getLocalStorage();

    const nuevosFavoritos = favoritos.filter((favorito: FavoriteType) => favorito.id !== id);

    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

    //si estamos en desarrollo es '/favorites.html', si es para produccion es '/favorites'
    if(window.location.pathname.includes('favorites')) {
        showRecipes(nuevosFavoritos, undefined, nuevosFavoritos.length ? undefined : 'no recipes');
    }
}