export interface Element<T> {
    on<E extends keyof HTMLElementEventMap>(
        event: E,
        callback: (e: HTMLElementEventMap[E]) => void
    ): void;
    hide(): void;
    show(): void;
    visible(): boolean;
    setVisible(visible: boolean): void;
    value(): string | null;
    text(...text: string[]): void;
    element: T;
}

export function elem<T extends HTMLElement>(query: string): Element<T> {
    const element = document.querySelector(query) as T | undefined | null;
    if (!element) return null;
    return {
        on<E extends keyof HTMLElementEventMap>(
            event: E,
            callback: (e: HTMLElementEventMap[E]) => void
        ): void {
            element.addEventListener(event, callback);
        },
        hide(): void {
            element.style.display = "none";
        },
        show(): void {
            element.style.display = "block";
        },
        visible(): boolean {
            return element.style.display !== "none";
        },
        setVisible(visible: boolean): void {
            element.style.display = visible ? "block" : "none";
        },
        value(): string | null {
            return element["value"] || null;
        },
        text(...text: string[]): void {
            element.innerText = text.join(" ");
        },
        element
    };
}
