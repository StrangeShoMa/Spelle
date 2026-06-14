import { StworzElement } from "../utils/dom.js";
//Tworzy komponent stopki strony zawierający sekcję informacyjną oraz dodatkowe linki pomocnicze.
export function Footer() {
    const footer = document.createElement("footer");
    const div = document.createElement("div");

    div.appendChild(StworzElement("h3", null, "Informacje:"));

    const ul = document.createElement("ul");
    ["Pomoc", "Kontakt", "Wykonali: Spelle"].forEach(tekst => {
        const li = document.createElement("li");
        const a = StworzElement("a", null, tekst);
        a.href = "#";
        li.appendChild(a);
        ul.appendChild(li);
    });

    div.appendChild(ul);
    footer.append(div);
    return footer;
}
