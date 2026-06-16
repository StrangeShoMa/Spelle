import { Menu } from "./menu.js";
import { StworzOferte } from "./oferta.js";
import { StworzElement } from "../utils/dom.js";
import { ofertyLista, PobierzOferty, aktualneKeywords, aktualnaLokalizacja, aktualneSortowanie } from "../api/oferty.js";

export function WidokListy() {
    const main = document.createElement("main");

    
    const [checkboxOpen, labelHamburger, menuDiv] = Menu(() => aktualizujWidok());
    main.appendChild(checkboxOpen);
    main.appendChild(labelHamburger);
    main.appendChild(menuDiv);

    const center = StworzElement("div", "center");

    
    const wyszukiwarkaBlok = StworzElement("div", "wyszukiwarka-blok");
    
    const inputStanowisko = document.createElement("input");
    inputStanowisko.type = "text";
    inputStanowisko.placeholder = "Szukaj stanowiska lub firmy...";
    inputStanowisko.className = "input-wyszukiwarka input-stanowisko";
    inputStanowisko.value = aktualneKeywords;
    
    const inputLokalizacja = document.createElement("input");
    inputLokalizacja.type = "text";
    inputLokalizacja.placeholder = "Miejscowość lub region...";
    inputLokalizacja.className = "input-wyszukiwarka input-lokalizacja";
    inputLokalizacja.value = aktualnaLokalizacja;
    
    const przyciskSzukaj = StworzElement("button", "przycisk-szukaj", "Szukaj");
    przyciskSzukaj.addEventListener("click", () => {
        const kw = inputStanowisko.value.trim();
        const loc = inputLokalizacja.value.trim();
        PobierzOferty(kw, loc || "Polska");
    });

    wyszukiwarkaBlok.appendChild(inputStanowisko);
    wyszukiwarkaBlok.appendChild(inputLokalizacja);
    wyszukiwarkaBlok.appendChild(przyciskSzukaj);
    center.appendChild(wyszukiwarkaBlok);

    const pasekInfo = StworzElement("div", "lista-pasek");
    
    const licznik = StworzElement("h3", "licznik-ofert", `Znaleziono ofert: ${ofertyLista.length}`);
    const przyciskDodaj = StworzElement("a", "przycisk-dodaj-oferte", "+ Dodaj ofertę");
    przyciskDodaj.href = "#dodaj";

    pasekInfo.appendChild(licznik);
    pasekInfo.appendChild(przyciskDodaj);
    center.appendChild(pasekInfo);
    
    const listaOfertKontener = StworzElement("div", "lista-ofert-kontener");
    center.appendChild(listaOfertKontener);

    function renderujOferty(daneDoWyswietlenia) {
        listaOfertKontener.innerHTML = ""; 
        licznik.textContent = `Znaleziono ofert: ${daneDoWyswietlenia.length}`;

        daneDoWyswietlenia.forEach(oferta => {
            const el = StworzOferte(oferta);
            if (oferta.lokalna) el.classList.add("oferta-lokalna");
            listaOfertKontener.appendChild(el);
        });
    }

    function pobierzKwote(tekstZarobkow) {
        if (!tekstZarobkow || tekstZarobkow === "Wynagrodzenia nie podano") return 0;
        const znalezioneCyfry = String(tekstZarobkow).match(/\d+/);
        return znalezioneCyfry ? parseInt(znalezioneCyfry[0], 10) : 0;
    }

    function aktualizujWidok() {
        const szukanaFraza = inputStanowisko.value.toLowerCase();
        const trybSortowania = aktualneSortowanie;

        let przetworzone = ofertyLista.filter(oferta => {
            const naglowek = (oferta.naglowek || "").toLowerCase();
            const firma = (oferta.firma || "").toLowerCase();
            return naglowek.includes(szukanaFraza) || firma.includes(szukanaFraza);
        });

    
        if (trybSortowania === "az") {
            przetworzone.sort((a, b) => (a.naglowek || "").localeCompare(b.naglowek || ""));
        } else if (trybSortowania === "za") {
            przetworzone.sort((a, b) => (b.naglowek || "").localeCompare(a.naglowek || ""));
        } else if (trybSortowania === "zarobki_rosnaco") {
            przetworzone.sort((a, b) => pobierzKwote(a.zarobki) - pobierzKwote(b.zarobki));
        } else if (trybSortowania === "zarobki_malejaco") {
            przetworzone.sort((a, b) => pobierzKwote(b.zarobki) - pobierzKwote(a.zarobki));
        }

        renderujOferty(przetworzone);
    }

    inputStanowisko.addEventListener("input", aktualizujWidok);

    
    aktualizujWidok();

    main.appendChild(center);
    return main;
}