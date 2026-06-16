import { ZbudujStrone } from "../main.js";

export let ofertyLista = [];
export let aktualneKeywords = "";
export let aktualnaLokalizacja = "Polska";
export let aktualneSortowanie = "domyslne";

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

export function UstawSortowanie(wariant) {
    aktualneSortowanie = wariant;
}

export async function PobierzOferty(keywords = "", location = "Polska") {
    aktualneKeywords = keywords;
    aktualnaLokalizacja = location;

    const CZAS_WAZNOSCI = 24 * 60 * 60 * 1000;
    const czasTeraz = Date.now();

    const kluczCache = `cacheOferty_${keywords}_${location}`;
    const kluczCzas = `czasPobraniaOfert_${keywords}_${location}`;

    const zapisanyCzas = localStorage.getItem(kluczCzas);
    const zapisaneOferty = localStorage.getItem(kluczCache);
    
    if (zapisaneOferty && zapisanyCzas && (czasTeraz - zapisanyCzas < CZAS_WAZNOSCI)) {
        console.info(`[System] Dane dla zapytania (Stanowisko: "${keywords}", Lokalizacja: "${location}") zostały pomyślnie załadowane z lokalnej pamięci podręcznej.`);
    } else {
        console.info(`[System] Brak aktualnych danych w cache. Pobieranie nowych ofert z API Jooble dla zapytania (Stanowisko: "${keywords}", Lokalizacja: "${location}")...`);
        try {
            const odpowiedz = await fetch('https://pl.jooble.org/api/2d1ce7de-4c18-43fb-9acd-e2526a9aaf09', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    keywords: keywords,
                    location: location,
                    ResultOnPage: "10",
                    page: "1"
                })
            });

            const dane = await odpowiedz.json();
            const ofertyAPI = (dane.jobs || []).map(API => ({
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

            localStorage.setItem(kluczCache, JSON.stringify(ofertyAPI));
            localStorage.setItem(kluczCzas, czasTeraz.toString());
            console.info("[System] Nowe dane z API zostały zapisane w pamięci podręcznej.");
        } catch (blad) {
            console.error("[System Błąd] Wystąpił problem podczas pobierania danych z API Jooble:", blad);
        }
    }

    const zapisane = localStorage.getItem(kluczCache);
    const ofertyAPIDoPolaczenia = zapisane ? JSON.parse(zapisane) : [];
    const lokalne = PobierzOfertyLokalne();
    
    ofertyLista = [...lokalne, ...ofertyAPIDoPolaczenia];

    document.body.innerHTML = "";
    ZbudujStrone();
}