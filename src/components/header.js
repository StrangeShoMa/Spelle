import { StworzElement } from "../utils/dom.js";

export function Header() {
    const header = document.createElement("header");

    const h1 = StworzElement("h1", null, "Oferty Pracy w Twojej Okolicy");
    h1.id = "nazwastrony";

    const nav = document.createElement("div");
    nav.id = "podstrony";

    const ul = document.createElement("ul");
    const linki = [
        {tekst: "Strona Główna", href: "index.html"},
        {tekst: "Kontakt", href: "#"}
    ];

    linki.forEach(link => {
        const li = document.createElement("li");
        const a = StworzElement("a", null, link.tekst);
        a.href = link.href;
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    header.appendChild(h1);
    header.appendChild(nav);

    return header;
}
