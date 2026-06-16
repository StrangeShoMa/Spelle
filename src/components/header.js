import { StworzElement } from "../utils/dom.js";

export function Header() {
    const header = document.createElement("header");
    const inner = StworzElement("div", "header-inner");
   
    const leftBox = StworzElement("div", "header-left");
    
    const logoLink = StworzElement("a", "header-logo-link");
    logoLink.href = "index.html";
    
    logoLink.innerHTML = `
        <svg class="header-logo" viewBox="0 0 220 40" xmlns="http://www.w3.org/2000/svg">
            <image href="src/assets/logo.png" x="0" y="0" width="35" height="35"/>
            <text x="48" y="25" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#2c3e50">PRO_OFERTY</text>
        </svg>
    `;

    const subtext = StworzElement("p", "header-subtext", "Największa baza danych ofert pracy");
    leftBox.appendChild(logoLink);
    leftBox.appendChild(subtext);

    const rightBox = StworzElement("div", "header-right");
    const aboutLink = StworzElement("a", "header-link", "Informacje o nas");
    aboutLink.href = "#onas"; 
    rightBox.appendChild(aboutLink);

    inner.appendChild(leftBox);
    inner.appendChild(rightBox);
    header.appendChild(inner);

    return header;
}