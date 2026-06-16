#Portal Ofert Pracy

##Opis projektu
Aplikacja internetowa służąca do przeglądania, wyszukiwania i dodawania ofert pracy. Projekt został stworzony od zera w czystym języku JavaScript (Vanilla JS) z wykorzystaniem architektury modułowej (ES6 Modules), bez użycia zewnętrznych frameworków.

Głównym założeniem było dynamiczne budowanie interfejsu (manipulacja DOM) oraz komunikacja z zewnętrznym serwerem.

##  Główne funkcjonalności
* **Dynamiczne pobieranie danych:** Asynchroniczne odpytywanie zewnętrznego API (Jooble) za pomocą funkcji `fetch()`, z uwzględnieniem słów kluczowych i lokalizacji.
* **Smart Cache & Globalny Stan:** Zastosowanie `localStorage` do buforowania ofert oraz przetrzymywanie zmiennych stanu (np. `aktualneKeywords`), co zapobiega utracie wpisanych danych po powrocie ze szczegółów oferty.
* **Własny Router (Hash Routing):** Aplikacja działa na jednym pliku HTML. Przełączanie między widokami odbywa się natychmiastowo poprzez nasłuchiwanie zdarzenia `hashchange` w adresie URL (np. `#oferta/123`, `#dodaj`, `#onas`).
* **Zaawansowane Sortowanie i Filtrowanie:** * Wyszukiwanie na żywo (po nazwie stanowiska i firmie).
  * Menu oparte na przyciskach typu *Radio* ułatwiające sortowanie.
  * Inteligentne sortowanie kwotowe – wbudowany parser wyciąga wartości liczbowe z tekstowych widełek płacowych (np. "10000 - 15000 zł").
* **Formularz z różnymi typami pól:** Możliwość dodania własnej oferty (z wykorzystaniem m.in. listy rozwijanej `<select>`), która zapisuje się w pamięci przeglądarki.

## Struktura plików
`index.html` - Punkt wejścia aplikacji. Pusty kontener, do którego JavaScript wstrzykuje całą aplikację.
* `style.css` - Główny arkusz stylów definiujący nowoczesny wygląd elementów.
* `src/` - Główny folder z kodem źródłowym:
  * `main.js` - Serce aplikacji (Entry point). Znajduje się tu Router (`ZbudujStrone()`), który nasłuchuje zmian w adresie URL (hash) i na ich podstawie dynamicznie renderuje odpowiednie widoki. Inicjuje również pierwsze pobranie ofert.
  * **`api/`** (Logika danych)
    * `oferty.js` - Połączenie z API (fetch), zarządzanie pamięcią podręczną (`localStorage`), dodawanie ofert lokalnych oraz przechowywanie głównej tablicy danych (`ofertyLista`).
  * **`components/`** (Komponenty UI i Widoki)
    * `header.js` / `footer.js` - Statyczne komponenty nagłówka i stopki.
    * `menu.js`- Zestaw komponentów budujących lewy panel boczny z opcjami filtrów i sortowania.
    * `oferta.js` - Komponent reprezentujący pojedynczą "kartę" ogłoszenia, gotową do wklejenia na listę.
    * `widokLista.js` - Widok główny: pasek wyszukiwania do odpytywania API, lokalne filtrowanie i renderowanie listy.
    * `widokSzczegolow.js` - Widok detali: wyszukuje i prezentuje pełne informacje o klikniętym ogłoszeniu.
    * `widokFormularz.js` - Widok formularza: pozwala użytkownikowi dodać nową, lokalną ofertę.
    * `widokOnas.js` - Podstrona statyczna z informacjami o autorach i projekcie.
  * **`utils/`** (Narzędzia)
    * Zawiera pliki pomocnicze, m.in. z funkcją `StworzElement`, która drastycznie przyspiesza proces budowania węzłów DOM.

## Jak uruchomić projekt
Z uwagi na to, że projekt korzysta z nowoczesnych modułów ES6 (`import` / `export`), przeglądarki blokują ich uruchamianie bezpośrednio z dysku (ze względów bezpieczeństwa CORS). 

Aby uruchomić aplikację:
1. Sklonuj repozytorium.
2. Uruchom projekt przez lokalny serwer. W edytorze VS Code najlepiej użyć do tego popularnego rozszerzenia **Live Server** (klikając *Go Live* w prawym dolnym rogu).
## Zdjęcia strony
Widok główny ![alt text](/src/assets/image.png)
Widok Formularza![alt text](/src/assets/image-1.png)
Widok szczegółowy![alt text](/src/assets/image-2.png)
Widok informacyjny![alt text](/src/assets/image-3.png)