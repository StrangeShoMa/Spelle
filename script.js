// let ofertyLista = [
//     {id: 1, naglowek: ".NET Developer", zarobki: "Dardzo dużo :)", lokalizacja: "Białystok", opis: "Szukamy kogoś do pracy w IT"},
//     {id: 2, naglowek: "Spawacz", zarobki: "sporo", lokalizacja: "Białystok", opis: "Doświadczony spawacz"},
//     {id: 3, naglowek: "Artysta", zarobki: "2000zł", lokalizacja: "Białystok", opis: "Szukamy kogoś kto potrafi malować"}
// ];

let ofertyLista = [];


async function PobierzOferty() {
    const CZAS_WAZNOSCI = 24 * 60 * 60 * 1000;
    const czasTeraz = new Date().getTime();

    //Ręczne ominięcie bufora:
    //W konsoli:   localStorage.clear();

    const zapisanyCzas = localStorage.getItem('czasPobraniaOfert');
    const zapisaneOferty = localStorage.getItem('cacheOferty');


    if (zapisaneOferty && zapisanyCzas && (czasTeraz - zapisanyCzas < CZAS_WAZNOSCI)) {
        console.log("Dane z pamięci przeglądarki");

        ofertyLista = JSON.parse(zapisaneOferty);
        
        document.body.innerHTML = '';
        ZbudujStrone();
        
        return; 
    }

    try {
        console.log("Dane z API");
        
        const odpowiedz = await fetch('https://pl.jooble.org/api/2d1ce7de-4c18-43fb-9acd-e2526a9aaf09', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keywords: "",
                location: "Polska",
                ResultOnPage: "10",
                page: "1"
            })
        });

        if (!odpowiedz.ok) {
            throw new Error(`Błąd HTTP! Status: ${odpowiedz.status}`);
        }

        const dane = await odpowiedz.json();

        ofertyLista = dane.jobs.map(API => ({
            firma: API.company || "Brak danych firmy",
            id: API.id,
            link: API.link,
            lokalizacja: API.location,
            zarobki: API.salary || "Wynagrodzenia nie podano", 
            opis2: API.snippet,
            zrodlo: API.source,
            naglowek: API.title,
            etat: API.type,
            aktualizacja: API.updated
        }));


        localStorage.setItem('cacheOferty', JSON.stringify(ofertyLista));
        localStorage.setItem('czasPobraniaOfert', czasTeraz);

        document.body.innerHTML = '';
        ZbudujStrone();

    } catch (blad) {
        console.error("Wystąpił błąd podczas pobierania ofert:", blad);
    }
}

let stanowisko = ["praktykant", "asystent", "szef", "git", "ekspert", "kierownik"];
let wojewodztwo = ["Podlaskie", "Mazowieckie", "Śląskie", "Dolno Sląskie"];
let umowy = ["Umowa o dzieło", "Czas nieokreślony", "Na stałe"];
let rodzajPracy = ["Biurowa", "Fizyczna", "Umysłowa"];

let sortowaniePoCzym = [
    {id: 0, kategoria: "Stanowisko", opcje: stanowisko},
    {id: 1, kategoria: "Wojewodztwo", opcje: wojewodztwo},
    {id: 2, kategoria: "Umowy", opcje: umowy},
    {id: 3, kategoria: "Rodzaj Pracy", opcje: rodzajPracy}
];

function StworzElement(tag, klasa, tekst) {
    const el = document.createElement(tag);
    if (klasa) {
        el.className = klasa;
    }
    if (tekst) {
        el.textContent = tekst;
    }
    return el;
}

function Header() {
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

function Filtry() {
    const ul = document.createElement("ul");

    sortowaniePoCzym.forEach(kategoria => {
        const li = document.createElement("li");

        const p = StworzElement("p", "sortowanietop", kategoria.kategoria + ":");
        li.appendChild(p);

        const podUl = document.createElement("ul");

        kategoria.opcje.forEach(opcja => {
            const podLi = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            
            const label = StworzElement("span", null, opcja);
            podLi.appendChild(checkbox);
            podLi.appendChild(label);
            podUl.appendChild(podLi);
        });
        li.appendChild(podUl);
        ul.appendChild(li);
    });
    return ul;
}

function Menu() {
    const checkboxOpen = document.createElement("input");
    checkboxOpen.type = "checkbox";
    checkboxOpen.id = "menu-open";

    const labelHamburger = StworzElement("label", null, "☰ Menu sortowania");
    labelHamburger.id = "hamburger-menu";
    labelHamburger.htmlFor = "menu-open";

    const menuDiv = document.createElement("div");
    menuDiv.className = "menu";

    const sortowanie = document.createElement("div");
    sortowanie.id = "sorting";

    const checkboxClose = document.createElement("input");
    checkboxClose.type = "checkbox";
    checkboxClose.id = "menu-close";

    const labelClose = StworzElement("label", null, "✖ Zamknij");
    labelClose.id = "close-menu";
    labelClose.htmlFor = "menu-open";

    const h2 = StworzElement("h2", null, "Menu sortowania:");

    sortowanie.appendChild(checkboxClose);
    sortowanie.appendChild(labelClose);
    sortowanie.appendChild(h2);
    sortowanie.appendChild(Filtry());

    menuDiv.appendChild(sortowanie);

    return [checkboxOpen, labelHamburger, menuDiv];
}

function StworzOferte(oferta) {
    const div = StworzElement("div", "oferta");
    div.style.cursor = "pointer";

    div.appendChild(StworzElement("div", "naglowek", oferta.naglowek));
    div.appendChild(StworzElement("div", "firma", oferta.firma));
    div.appendChild(StworzElement("div", "zarobki", oferta.zarobki));
    div.appendChild(StworzElement("div", "lokalizacja", oferta.lokalizacja));
    div.appendChild(StworzElement("div", "opis", oferta.opis));

    div.addEventListener("click", () => {
    
    window.location.hash = `#oferta/${oferta.id}`;
    })
    return div;
}
function WidokSzczegolow(idOferty) {
    const main = document.createElement("main");
    const center = StworzElement("div", "center");
    center.style.padding = "20px";
    center.style.backgroundColor = "#fff";
    center.style.borderRadius = "8px";

    
    const oferta = ofertyLista.find(o => o.id == idOferty);

    if (oferta) {
        center.appendChild(StworzElement("h2", null, oferta.naglowek));
        center.appendChild(StworzElement("h3", null, oferta.firma));
        center.appendChild(StworzElement("p", null, `Zarobki: ${oferta.zarobki}`));
        center.appendChild(StworzElement("p", null, `Lokalizacja: ${oferta.lokalizacja}`));
        
        const pelnyOpis = document.createElement("div");
        pelnyOpis.style.marginTop = "20px";
        pelnyOpis.innerHTML = oferta.opis || "Brak dodatkowego opisu.";
        center.appendChild(pelnyOpis);
    } else {
        center.appendChild(StworzElement("h2", null, "Oferta nie została znaleziona."));
    }

    const btn = StworzElement("button", null, "Powrót do listy");
    btn.style.marginTop = "20px";
    btn.style.padding = "10px 20px";
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => {
        window.location.hash = ""; 
    });
    center.appendChild(btn);

    main.appendChild(center);
    return main;
}
function WidokListy() {
    const main = document.createElement("main");
    
    // Dodajemy Twoje oryginalne menu
    const [checkboxOpen, labelHamburger, menuDiv] = Menu();
    main.appendChild(checkboxOpen);
    main.appendChild(labelHamburger);
    main.appendChild(menuDiv);

    const center = StworzElement("div", "center");

    const licznik = StworzElement("h3", null, `Znaleziono ofert: ${ofertyLista.length}`);
    licznik.style.marginBottom = "20px";
    center.appendChild(licznik);

    
    ofertyLista.forEach(oferta => {
        center.appendChild(StworzOferte(oferta));
    });

    main.appendChild(center);
    return main;
}


function Footer() {
    const footer = document.createElement("footer");
    const div = document.createElement("div");

    div.appendChild(
        StworzElement("h3", null, "Informacje:")
    );

    const ul = document.createElement("ul");
    const linki = ["Pomoc", "Kontakt", "Wykonali: Spelle"];
    linki.forEach(tekst => {
        const li = document.createElement("li");
        const a = StworzElement("a", null, tekst);
        a.href = "#";
        li.appendChild(a);
        ul.appendChild(li);
    })

    div.appendChild(ul);
    footer.append(div);
    return footer;
}

function ZbudujStrone() {
    document.body.innerHTML = ''; 
    document.body.appendChild(Header());

    const hash = window.location.hash;

    if (hash.startsWith("#oferta/")) {
        const id = hash.split("/")[1]; 
        document.body.appendChild(WidokSzczegolow(id));
    } 
    else {
        document.body.appendChild(WidokListy());
    }

    document.body.appendChild(Footer());
}

window.addEventListener("hashchange", ZbudujStrone);

PobierzOferty();

