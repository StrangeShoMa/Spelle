import { StworzElement } from "../utils/dom.js";
import { DodajOferteLokalnie } from "../api/oferty.js";

export function WidokFormularza() {
    const main = document.createElement("main");
    const center = StworzElement("div", "center");
    
    const karta = StworzElement("div", "formularz-karta");

    const h2 = StworzElement("h2", "formularz-tytul", "Dodaj ofertę pracy");
    karta.appendChild(h2);

    const pola = [
        { id: "f-naglowek",     label: "Nazwa stanowiska*", type: "text",       placeholder: "Np. Kierownik" },
        { id: "f-firma",        label: "Nazwa firmy*",      type: "text",       placeholder: "Np. Januszex SP. z o.o." },
        { id: "f-lokalizacja",  label: "Lokalizacja*",      type: "text",       placeholder: "Np. Białystok"},
        { id: "f-zarobki",      label: "Zarobki",           type: "text",       placeholder: "Np. 5000-10000zł" },
        { id: "f-opis",         label: "Opis oferty",       type: "textarea",   placeholder: "Np. Zakres obowiązków, wymagania na stanowisko"}
    ];

    pola.forEach(({ id, label, type, placeholder }) => {
        const pole = StworzElement("div", "formularz-pole");
        const lbl = StworzElement("label", "formularz-label", label);
        lbl.htmlFor = id;
        pole.appendChild(lbl);

        let input;
        if(type === "textarea") {
            input = document.createElement("textarea");
            input.className = "formularz-input formularz-textarea";
            input.rows = 4;
        } else {
            input = document.createElement("input");
            input.type = type
            input.className = "formularz-input";
        }

        input.id = id;
        input.placeholder = placeholder;
        pole.appendChild(input);

        const blad = StworzElement("span", "formularz-blad");
        blad.id = `${id}-blad`;
        pole.appendChild(blad);

        karta.appendChild(pole);
    });

    const przyciskiPola = StworzElement("div", "formularz-przycisk");

    const przyciskDodaj = StworzElement("button", "przycisk-dodaj", "Dodaj ofertę");
    przyciskDodaj.addEventListener("click", () => zapiszOferte());

    const przyciskWroc = StworzElement("button", "przycisk-wroc", "Wróć do listy ofert");
    przyciskWroc.addEventListener("click", () => { 
        window.location.hash = ""; 
    });

    przyciskiPola.appendChild(przyciskDodaj);
    przyciskiPola.appendChild(przyciskWroc);
    karta.appendChild(przyciskiPola);

    center.appendChild(karta);
    main.appendChild(center);
    return main;
}
function zapiszOferte() {
    document.querySelectorAll(".formularz-blad").forEach(el => el.textContent = "");

    const naglowek    = document.getElementById("f-naglowek").value.trim();
    const firma       = document.getElementById("f-firma").value.trim();
    const lokalizacja = document.getElementById("f-lokalizacja").value.trim();
    const zarobki     = document.getElementById("f-zarobki").value.trim();
    const opis        = document.getElementById("f-opis").value.trim();

    const PolaWymagane = ["naglowek", "firma", "lokalizacja"];
    let czyBledne = false;

    PolaWymagane.forEach(pole => {
        const input = document.getElementById(`f-${pole}`);
        if (!input.value.trim()) {
            document.getElementById(`f-${pole}-blad`).textContent = "Pole wymagane.";
            czyBledne = true;
        }
    })
    
    if (czyBledne) return;

    const nowaOferta = {
        id: "local_" + Date.now(),
        naglowek,
        firma,
        lokalizacja,
        zarobki:    zarobki || "Nie podano wynagrodzenia",
        opis:       opis    || "Brak opisu",
        lokalna:    true,
    };

    DodajOferteLokalnie(nowaOferta);
    window.location.hash = "";
}