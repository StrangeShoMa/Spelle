import { ZbudujStrone } from "../main.js";

export let ofertyLista = [];

export async function PobierzOferty() {
    const CZAS_WAZNOSCI = 24 * 60 * 60 * 1000;
    const czasTeraz = Date.now();

    const zapisanyCzas = localStorage.getItem('czasPobraniaOfert');
    const zapisaneOferty = localStorage.getItem('cacheOferty');

    if (zapisaneOferty && zapisanyCzas && (czasTeraz - zapisanyCzas < CZAS_WAZNOSCI)) {
        ofertyLista = JSON.parse(zapisaneOferty);
        document.body.innerHTML = '';
        ZbudujStrone();
        return;
    }

    try {
        const odpowiedz = await fetch('https://pl.jooble.org/api/2d1ce7de-4c18-43fb-9acd-e2526a9aaf09', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                keywords: "",
                location: "Polska",
                ResultOnPage: "10",
                page: "1"
            })
        });

        const dane = await odpowiedz.json();

        ofertyLista = dane.jobs.map(API => ({
            firma: API.company || "Brak danych firmy",
            id: API.id,
            link: API.link,
            lokalizacja: API.location,
            zarobki: API.salary || "Wynagrodzenia nie podano",
            opis: API.snippet,
            zrodlo: API.source,
            naglowek: API.title,
            etat: API.type,
            aktualizacja: API.updated
        }));

        localStorage.setItem('cacheOferty', JSON.stringify(ofertyLista));
        localStorage.setItem('czasPobraniaOfert', czasTeraz);

        document.body.innerHTML = '';
        ZbudujStrone();

    } catch (blad) {
        console.error("Błąd pobierania ofert:", blad);
    }
}
