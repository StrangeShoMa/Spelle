import { StworzElement } from "../utils/dom.js";

export function StworzOferte(oferta) {
    const div = StworzElement("div", "oferta");
    div.style.cursor = "pointer";

    div.appendChild(StworzElement("div", "naglowek", oferta.naglowek));
    div.appendChild(StworzElement("div", "firma", oferta.firma));
    
    
    const badgeContainer = StworzElement("div", "badge-container");
    badgeContainer.appendChild(StworzElement("div", "badge-zarobki", oferta.zarobki));
    badgeContainer.appendChild(StworzElement("div", "badge-lokalizacja", oferta.lokalizacja));
    div.appendChild(badgeContainer);

    const wymiarEtatu = oferta.etat ? oferta.etat : "Pełny etat";
    const etatBox = StworzElement("div", "etat-info", `Wymiar etatu: ${wymiarEtatu}`);
    div.appendChild(etatBox);

    div.addEventListener("click", () => {
        window.location.hash = `#oferta/${oferta.id}`;
    });

    return div;
}