import { StworzElement } from "../utils/dom.js";
//Buduje klikalną kartę pojedynczej oferty pracy, która po wybraniu przekierowuje użytkownika do widoku jej szczegółów.
export function StworzOferte(oferta) {
    const div = StworzElement("div", "oferta");
    div.style.cursor = "pointer";

    div.appendChild(StworzElement("div", "naglowek", oferta.naglowek));
    div.appendChild(StworzElement("div", "firma", oferta.firma));
    div.appendChild(StworzElement("div", "zarobki", oferta.zarobki));
    div.appendChild(StworzElement("div", "lokalizacja", oferta.lokalizacja));
    div.appendChild(StworzElement("div", "opis", oferta.opis));

    div.addEventListener("click", () => {
        window.location.hash = `#oferta/${oferta.id}`;
    });

    return div;
}
