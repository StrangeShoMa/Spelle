import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { WidokListy } from "./components/widokLista.js";
import { WidokSzczegolow } from "./components/widokSzczegoly.js";
import { PobierzOferty } from "./api/oferty.js";

export function ZbudujStrone() {
    document.body.innerHTML = "";
    document.body.appendChild(Header());

    const hash = window.location.hash;

    if (hash.startsWith("#oferta/")) {
        const id = hash.split("/")[1];
        document.body.appendChild(WidokSzczegolow(id));
    } else {
        document.body.appendChild(WidokListy());
    }

    document.body.appendChild(Footer());
}

window.addEventListener("hashchange", ZbudujStrone);

PobierzOferty();
