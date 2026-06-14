import { Filtry } from "./filtry.js";
import { StworzElement } from "../utils/dom.js";
//Buduje zestaw elementów bocznego panelu sortowania wraz z obsługą rozwijania i zwijania menu hamburgerowego.
export function Menu() {
    const checkboxOpen = document.createElement("input");
    checkboxOpen.type = "checkbox";
    checkboxOpen.id = "menu-open";

    const labelHamburger = StworzElement("label", null, "☰ Menu sortowania");
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

    const h2 = StworzElement("h2", null, "Menu sortowania:");

    sortowanie.appendChild(checkboxClose);
    sortowanie.appendChild(labelClose);
    sortowanie.appendChild(h2);
    sortowanie.appendChild(Filtry());

    menuDiv.appendChild(sortowanie);

    return [checkboxOpen, labelHamburger, menuDiv];
}
