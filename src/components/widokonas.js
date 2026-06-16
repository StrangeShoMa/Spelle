import { StworzElement } from "../utils/dom.js";

export function Widokonas(){
    
    const main = document.createElement("main");
    const center = StworzElement("div", "center");
    
    const karta = StworzElement("div", "formularz-karta");
    
    const h2 = StworzElement("h2", "formularz-tytul", "Informacje o portalu PRO_OFERTY");
    h2.style.marginBottom = "20px";
    karta.appendChild(h2);

    const zdjecie = document.createElement("img");
    zdjecie.src = "./src/components/siedziba.jpg"; 
    zdjecie.alt = "Nasza siedziba";
    zdjecie.style.width = "100%";
    zdjecie.style.borderRadius = "8px";
    zdjecie.style.marginBottom = "20px";
    zdjecie.style.objectFit = "cover";
    karta.appendChild(zdjecie);

    const teksty = [
        "Dobre chłopaki Znajdują dobre prace",
        "Wykonali:",
        "Hubert Bańkowski",
        "Konrad Palikot",
        "Mateusz Citko"
    ];

    teksty.forEach(akapitTekst => {
        const p = StworzElement("p", null, akapitTekst);
        p.style.marginBottom = "15px";
        p.style.lineHeight = "1.6";
        p.style.textAlign = "justify";
        karta.appendChild(p);
    });

    
    const przyciskiPola = StworzElement("div", "formularz-przycisk");
    przyciskiPola.style.marginTop = "30px";
    
    const przyciskWroc = StworzElement("button", "przycisk-wroc", "Wróć na stronę główną");
    przyciskWroc.addEventListener("click", () => { 
        window.location.hash = ""; 
    });

    przyciskiPola.appendChild(przyciskWroc);
    karta.appendChild(przyciskiPola);

    center.appendChild(karta);
    main.appendChild(center);
    return main;
}
