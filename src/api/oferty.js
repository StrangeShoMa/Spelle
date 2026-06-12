import { ZbudujStrone } from "../main.js";

export let ofertyLista = [];

const KLUCZ_LOKALNE = "ofertyLokalne";

function PobierzOfertyLokalne() {
    try {
        return JSON.parse(localStorage.getItem(KLUCZ_LOKALNE)) || [];
    } catch {
        return [];
    }
}

export function DodajOferteLokalnie(oferta) {
    const lokalne = PobierzOfertyLokalne();
    lokalne.push(oferta);
    localStorage.setItem(KLUCZ_LOKALNE, JSON.stringify(lokalne));
}

export async function PobierzOferty() {
    const CZAS_WAZNOSCI = 24 * 60 * 60 * 1000;
    const czasTeraz = Date.now();

    const zapisanyCzas = localStorage.getItem('czasPobraniaOfert');
    const zapisaneOferty = localStorage.getItem('cacheOferty');

    if (zapisaneOferty && zapisanyCzas && (czasTeraz - zapisanyCzas < CZAS_WAZNOSCI)) {
        ofertyLista = JSON.parse(zapisaneOferty);
    }

    let ofertyAPI = [];
    
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


        ofertyAPI = dane.jobs.map(API => ({
            firma:          API.company     || "Brak danych firmy",
            id:             API.id,
            link:           API.link,
            lokalizacja:    API.location,
            zarobki:        API.salary      || "Wynagrodzenia nie podano",
            opis:           API.snippet,
            zrodlo:         API.source,
            naglowek:       API.title,
            etat:           API.type,
            aktualizacja:   API.updated,
            lokalna:        false
        }));

        localStorage.setItem('cacheOferty', JSON.stringify(ofertyAPI));
        localStorage.setItem('czasPobraniaOfert', czasTeraz);

    } catch (blad) {
        console.error("Błąd pobierania ofert:", blad);
        document.body.innerHTML = "";
        ZbudujStrone();
    }
    const lokalne = PobierzOfertyLokalne();
    ofertyLista = [...lokalne, ...ofertyAPI];

    document.body.innerHTML = "";
    ZbudujStrone();
}
