let ofertyLista = [
    {id: 1, naglowek: ".NET Developer", zarobki: "Dardzo dużo :)", lokalizacja: "Białystok", opis: "Szukamy kogoś do pracy w IT"},
    {id: 2, naglowek: "Spawacz", zarobki: "sporo", lokalizacja: "Białystok", opis: "Doświadczony spawacz"},
    {id: 3, naglowek: "Artysta", zarobki: "2000zł", lokalizacja: "Białystok", opis: "Szukamy kogoś kto potrafi malować"}
];

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

function podKategorieFiltrow(listapkf) {
    let podkategorie = "";
    listapkf.forEach(e => {
        podkategorie += `
            <li><input type="checkbox">${e}</li>
        `
    });
    return podkategorie;
}

function KategorieFiltrow(listakf) {
    let filtry = "<ul>";
    listakf.forEach(e => {
        filtry += `
            <li><p class="sortowanietop">${e.kategoria}:</p>
            <ul>
                ${podKategorieFiltrow(e.opcje)}
            </ul>
        `
    });
    filtry += "</ul>"
    return filtry;
}

const strukturaMain = `
<header>
        <h1 id="nazwastrony">Oferty Pracy w Twojej Okolicy</h1>
        <div id="podstrony">
            <ul>
                <li><a href="#">Strona Główna</a></li>
                <li><a href="#">Kontakt</a></li>
            </ul>
        </div>
    </header>

    <main>
        <input type="checkbox" id="menu-open">
        <label for="menu-open" id="hamburger-menu">☰ Menu sortowania</label>
        <div class="menu">
            <div id="sorting">
                <input type="checkbox" id="menu-close">
                <label for="menu-open" id="close-menu">✖ Zamknij</label>
                <h2>Menu sortowania:</h2>
                ${KategorieFiltrow(sortowaniePoCzym)}
            </div>
        </div>
        <div class="center">
            </div>
    </main>

    <footer>
        <div> <h3>Jakieś losowe informacje:</h3>
            <ul>
                <li><a href="#">Pomoc</a></li>
                <li><a href="#">Kontakt</a></li>
                <li><a href="#">Prawa Autorskie</a></li>
                <li><a href="#">Wykonawca: Spelle</a></li>
            </ul>
        </div>
    </footer>
`;

document.body.innerHTML = strukturaMain;

const main = document.querySelector(".center");

const licznik = document.createElement("h3");
licznik.innerText = `Znaleziono ofert: ${ofertyLista.length}`;
licznik.style.marginBottom = "20px";
main.prepend(licznik);

ofertyLista.forEach(oferta => {
    const oferty = `
        <div class="oferta">
            <div class="naglowek">${oferta.naglowek}</div>
            <div class="zarobki">${oferta.zarobki}</div>
            <div class="lokalizacja">${oferta.lokalizacja}</div>
            <div class="opis">${oferta.opis}</div>
        </div>
    `;

    main.insertAdjacentHTML('beforeend', oferty);
})

