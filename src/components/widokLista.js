
import { Menu } from "./menu.js";
import { StworzOferte } from "./oferta.js";
import { StworzElement } from "../utils/dom.js";
import { ofertyLista } from "../api/oferty.js";
//Generuje główny widok aplikacji zawierający interaktywną wyszukiwarkę, opcje sortowania oraz przefiltrowaną listę ofert pracy.
export function WidokListy() {
    const main = document.createElement("main");

    const [checkboxOpen, labelHamburger, menuDiv] = Menu();
    main.appendChild(checkboxOpen);
    main.appendChild(labelHamburger);
    main.appendChild(menuDiv);

    const center = StworzElement("div", "center");

    const pasek = StworzElement("div", "lista-pasek");
    
    const wyszukiwarka = document.createElement("input");
    wyszukiwarka.type = "text";
    wyszukiwarka.placeholder = "Szukaj stanowiska lub firmy...";
    wyszukiwarka.className = "input-wyszukiwarka";
    
    const sortowanieSelect = document.createElement("select");
    sortowanieSelect.innerHTML = `
        <option value="domyslne">Kolejność domyślna</option>
        <option value="az">Stanowisko: A-Z</option>
        <option value="za">Stanowisko: Z-A</option>
    `;
    const licznik = StworzElement("h3", null, `Znaleziono ofert: ${ofertyLista.length}`);
    center.appendChild(licznik);

    const przyciskDodaj = StworzElement("a", "przycisk-dodaj-oferte", " + Dodaj ofertę");
    przyciskDodaj.href = "#dodaj";
    pasek.appendChild(wyszukiwarka);
    pasek.appendChild(sortowanieSelect);
    pasek.appendChild(licznik);
    pasek.appendChild(przyciskDodaj);
    center.appendChild(pasek);

    center.appendChild(przyciskDodaj);
    
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

function aktualizujWidok() {
        const szukanaFraza = wyszukiwarka.value.toLowerCase();
        const trybSortowania = sortowanieSelect.value;

     
        let przetworzone = ofertyLista.filter(oferta => {
            const naglowek = oferta.naglowek.toLowerCase();
            const firma = (oferta.firma || "").toLowerCase();
            return naglowek.includes(szukanaFraza) || firma.includes(szukanaFraza);
        });

       
        if (trybSortowania === "az") {
            przetworzone.sort((a, b) => a.naglowek.localeCompare(b.naglowek));
        } else if (trybSortowania === "za") {
            przetworzone.sort((a, b) => b.naglowek.localeCompare(a.naglowek));
        }

        renderujOferty(przetworzone);
    }
    wyszukiwarka.addEventListener("input", aktualizujWidok);
    sortowanieSelect.addEventListener("change", aktualizujWidok);


    aktualizujWidok();

    main.appendChild(center);
    return main;
}