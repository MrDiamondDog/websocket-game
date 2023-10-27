export function elem<T extends HTMLElement>(query: string): T {
    return document.querySelector(query) as T;
}
