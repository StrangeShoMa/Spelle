import { StworzElement } from "../utils/dom.js";

export function Footer() {
    const footer = document.createElement("footer");
    const inner = StworzElement("div", "footer-inner");
   
    const linksBox = StworzElement("div", "footer-links");
    
    const mainLink = StworzElement("a", null, "Strona Główna");
    mainLink.href = "index.html";
    
    const aboutLink = StworzElement("a", null, "Informacje o nas");
    aboutLink.href = "#onas";

    linksBox.appendChild(mainLink);
    linksBox.appendChild(aboutLink);

    const infoBox = StworzElement("div", "footer-info");
    const authors = StworzElement("p", "footer-authors", "Wykonali: Spelle");
    
    const biezacyRok = new Date().getFullYear();
    const copyright = StworzElement("p", "footer-copyright", `© ${biezacyRok} Wszelkie prawa zastrzeżone.`);

    infoBox.appendChild(authors);
    infoBox.appendChild(copyright);

    inner.appendChild(linksBox);
    inner.appendChild(infoBox);
    footer.appendChild(inner);

    return footer;
}