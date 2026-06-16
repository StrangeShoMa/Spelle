import { StworzElement } from "../utils/dom.js";
import { ofertyLista } from "../api/oferty.js";

export function WidokSzczegolow(idOferty) {
    const main = document.createElement("main");
    const center = StworzElement("div", "center szczegoly-kontener");

    const oferta = ofertyLista.find(o => o.id == idOferty);

    if (oferta) {
        center.appendChild(StworzElement("h2", "szczegoly-naglowek", oferta.naglowek));
        center.appendChild(StworzElement("h3", "szczegoly-firma", oferta.firma));
        
        const badgeContainer = StworzElement("div", "badge-container");
        badgeContainer.appendChild(StworzElement("span", "badge-zarobki", `Zarobki: ${oferta.zarobki}`));
        badgeContainer.appendChild(StworzElement("span", "badge-lokalizacja", `Miejscowość: ${oferta.lokalizacja}`));
        center.appendChild(badgeContainer);

        const wymiarEtatu = oferta.etat ? oferta.etat : "Pełny etat";
        const separator = StworzElement("div", "etat-info", `Wymiar etatu: ${wymiarEtatu}`);
        center.appendChild(separator);

        const opis = document.createElement("div");
        opis.className = "szczegoly-opis";
        opis.innerHTML = oferta.opis || "Brak dodatkowego opisu.";
        center.appendChild(opis);
    }
  
    const przyciskiKontener = StworzElement("div", "szczegoly-przyciski-box");

    if (oferta && oferta.link) {
        const link = StworzElement("a", "szczegoly-wroc", "Link do oryginalnej oferty");
        link.href = oferta.link;
        link.target = "_blank";
        przyciskiKontener.appendChild(link);
    }

    const btnPowrot = StworzElement("button", "przycisk-wroc", "Powrót");
    btnPowrot.addEventListener("click", () => window.location.hash = "");
    przyciskiKontener.appendChild(btnPowrot);

    center.appendChild(przyciskiKontener);

    main.appendChild(center);
    return main;
}