import { StworzElement } from "../utils/dom.js";
import { ofertyLista } from "../api/oferty.js";

export function WidokSzczegolow(idOferty) {
    const main = document.createElement("main");
    const center = StworzElement("div", "center");

    const oferta = ofertyLista.find(o => o.id == idOferty);

    if (oferta) {
        center.appendChild(StworzElement("h2", null, oferta.naglowek));
        center.appendChild(StworzElement("h3", null, oferta.firma));
        center.appendChild(StworzElement("p", null, `Zarobki: ${oferta.zarobki}`));
        center.appendChild(StworzElement("p", null, `Lokalizacja: ${oferta.lokalizacja}`));

        const opis = document.createElement("div");
        opis.innerHTML = oferta.opis || "Brak dodatkowego opisu.";
        center.appendChild(opis);
    }

    const btn = StworzElement("button", null, "Powrót");
    btn.addEventListener("click", () => window.location.hash = "");
    center.appendChild(btn);

    main.appendChild(center);
    return main;
}
