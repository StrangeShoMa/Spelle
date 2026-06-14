// Tworzy i zwraca nowy element HTML o podanym tagu, opcjonalnej klasie CSS i zawartości tekstowej.
export function StworzElement(tag, klasa, tekst) {
    const el = document.createElement(tag);
    if (klasa) el.className = klasa;
    if (tekst) el.textContent = tekst;
    return el;
}
