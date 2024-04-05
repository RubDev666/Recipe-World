import * as bootstrap from 'bootstrap';

export function showToast(mensaje: string) {
    const toastDiv = document.querySelector('#toast') as HTMLElement;
    const toastBody = document.querySelector('.toast-body') as HTMLElement;

    const toast = new bootstrap.Toast(toastDiv);

    cleanHtml(toastBody);

    const text = document.createElement('P');
    text.classList.add('fw-bold', 'fs-6', 'm-0');
    text.textContent = mensaje;

    toastBody.appendChild(text);

    toast.show();
}

export function noResults(message: string): HTMLElement {
    const noCategories = document.createElement('P');
    noCategories.classList.add('text-secondary', 'fs-2', 'my-4', 'text-center');
    noCategories.textContent = message;

    return noCategories;
}

export function cleanHtml(selector: HTMLElement) {
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}
