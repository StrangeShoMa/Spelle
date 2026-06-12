import { Menu } from "./menu.js";
import { StworzOferte } from "./oferta.js";
import { StworzElement } from "../utils/dom.js";
import { ofertyLista } from "../api/oferty.js";

export function WidokListy() {
    const main = document.createElement("main");

    const [checkboxOpen, labelHamburger, menuDiv] = Menu();
    main.appendChild(checkboxOpen);
    main.appendChild(labelHamburger);
    main.appendChild(menuDiv);

    const center = StworzElement("div", "center");

    const pasek = StworzElement("div", "lista-pasek");

    const licznik = StworzElement("h3", null, `Znaleziono ofert: ${ofertyLista.length}`);
    center.appendChild(licznik);

    const przyciskDodaj = StworzElement("a", "przycisk-dodaj-oferte", " + Dodaj ofertę");
    przyciskDodaj.href = "#dodaj";
    pasek.appendChild(licznik);
    pasek.appendChild(przyciskDodaj);
    center.appendChild(pasek);

    center.appendChild(przyciskDodaj);

    ofertyLista.forEach(oferta => {
        const el = StworzOferte(oferta);
        if (oferta.lokalna) el.classList.add("oferta-lokalna");
        center.appendChild(el);
    });

    main.appendChild(center);
    return main;
}
