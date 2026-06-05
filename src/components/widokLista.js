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

    const licznik = StworzElement("h3", null, `Znaleziono ofert: ${ofertyLista.length}`);
    center.appendChild(licznik);

    ofertyLista.forEach(oferta => {
        center.appendChild(StworzOferte(oferta));
    });

    main.appendChild(center);
    return main;
}
