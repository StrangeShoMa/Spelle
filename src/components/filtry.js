import { sortowaniePoCzym } from "../utils/dane.js";
import { StworzElement } from "../utils/dom.js";

export function Filtry() {
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
