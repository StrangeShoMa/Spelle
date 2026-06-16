import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { WidokListy } from "./components/widokLista.js";
import { WidokSzczegolow } from "./components/widokSzczegolow.js";
import { PobierzOferty } from "./api/oferty.js";
import { WidokFormularza } from "./components/widokFormularz.js";
import { Widokonas } from "./components/widokonas.js";

export function ZbudujStrone() {
    document.body.innerHTML = "";
    document.body.appendChild(Header());

    const hash = window.location.hash;

    if (hash.startsWith("#oferta/")) {
        const id = hash.split("/")[1];
        document.body.appendChild(WidokSzczegolow(id));
    } else if (hash === "#dodaj") {
        document.body.appendChild(WidokFormularza());
    } else if (hash === "#onas") {
    document.body.appendChild(Widokonas()); 
    }else {
        document.body.appendChild(WidokListy());
    }

    document.body.appendChild(Footer());
}

window.addEventListener("hashchange", ZbudujStrone);

PobierzOferty();