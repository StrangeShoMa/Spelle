import { StworzElement } from "../utils/dom.js";
import { aktualneSortowanie, UstawSortowanie } from "../api/oferty.js";

export function Menu(onSortChange) {
    const checkboxOpen = document.createElement("input");
    checkboxOpen.type = "checkbox";
    checkboxOpen.id = "menu-open";

    const labelHamburger = StworzElement("label", null, "☰ Opcje");
    labelHamburger.id = "hamburger-menu";
    labelHamburger.htmlFor = "menu-open";

    const menuDiv = document.createElement("div");
    menuDiv.className = "menu";

    const sortowanie = document.createElement("div");
    sortowanie.id = "sorting";

    const checkboxClose = document.createElement("input");
    checkboxClose.type = "checkbox";
    checkboxClose.id = "menu-close";

    const labelClose = StworzElement("label", null, "✖ Zamknij");
    labelClose.id = "close-menu";
    labelClose.htmlFor = "menu-open";

    const h2 = StworzElement("h2", null, "Opcje Sortowania");
    sortowanie.appendChild(checkboxClose);
    sortowanie.appendChild(labelClose);
    sortowanie.appendChild(h2);

    const sortowanieKolejnoscBlok = StworzElement("div", "sortowanie-kolejnosc-blok");
    const labelSelect = StworzElement("h3", "sortowanietop", "Sortowanie (1 do wyboru)");
    sortowanieKolejnoscBlok.appendChild(labelSelect);

   const opcjeSortowania = [
        { wartosc: "domyslne",          etykieta: "Domyślne" },
        { wartosc: "az",                etykieta: "Stanowisko A-Z" },
        { wartosc: "za",                etykieta: "Stanowisko Z-A" },
        { wartosc: "zarobki_rosnaco",   etykieta: "Zarobki rosnąco" },
        { wartosc: "zarobki_malejaco",  etykieta: "Zarobki malejąco" }
    ];
    
    opcjeSortowania.forEach(opcja => {
        const wiersz = document.createElement("div");
        wiersz.style.marginBottom = "8px"; 

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "grupa_sortowanie"; 
        radio.value = opcja.wartosc;
        radio.id = `radio_${opcja.wartosc}`;
        radio.style.cursor = "pointer";

        
        if (aktualneSortowanie === opcja.wartosc) {
            radio.checked = true;
        }
       
        radio.addEventListener("change", (e) => {
            if (e.target.checked) {
                UstawSortowanie(e.target.value);
                if (onSortChange) {
                    onSortChange();
                }
            }
        });
       
        const label = document.createElement("label");
        label.htmlFor = `radio_${opcja.wartosc}`;
        label.textContent = opcja.etykieta;
        label.style.marginLeft = "8px";
        label.style.cursor = "pointer"; 

        wiersz.appendChild(radio);
        wiersz.appendChild(label);
        sortowanieKolejnoscBlok.appendChild(wiersz);
    });

    sortowanie.appendChild(sortowanieKolejnoscBlok);
    menuDiv.appendChild(sortowanie);

    return [checkboxOpen, labelHamburger, menuDiv];
}