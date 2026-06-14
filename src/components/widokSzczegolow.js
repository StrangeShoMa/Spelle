import { StworzElement } from "../utils/dom.js";
import { ofertyLista } from "../api/oferty.js";

export function WidokSzczegolow(idOferty) {
    const main = document.createElement("main");
    const center = StworzElement("div", "center szczegoly-kontener");

    const oferta = ofertyLista.find(o => o.id == idOferty);

    if (oferta) {
        center.appendChild(StworzElement("h2", "szczegoly-naglowek", oferta.naglowek));
        center.appendChild(StworzElement("h3", "szczegoly-firma", oferta.firma));
        const pasekInfo = StworzElement("div", "szczegoly-pasek-info");
        pasekInfo.appendChild(StworzElement("span", "szczegoly-tag", `Zarobki: ${oferta.zarobki}`));
        pasekInfo.appendChild(StworzElement("span", "szczegoly-tag", `Miejscowość: ${oferta.lokalizacja}`));
        center.appendChild(pasekInfo);

        const opis = document.createElement("div");
        opis.className = "szczegoly-opis";
        opis.innerHTML = oferta.opis || "Brak dodatkowego opisu.";
        center.appendChild(opis);
    }

    if (oferta.link) {
        const link = StworzElement("a", "szczegoly-wroc", "Link do orginalnej oferty");
        link.href = oferta.link;
        link.target = "_blank";
        center.appendChild(link);
    }

    const btnPowrot = StworzElement("button", "szczegoly-wroc", "Powrót");
    btnPowrot.addEventListener("click", () => window.location.hash = "");
    center.appendChild(btnPowrot);

    main.appendChild(center);
    return main;
}
