#Portal Ofert Pracy

##Opis projektu
Aplikacja internetowa służąca do przeglądania, wyszukiwania i dodawania ofert pracy. Projekt został stworzony od zera w czystym języku JavaScript (Vanilla JS) z wykorzystaniem architektury modułowej (ES6 Modules), bez użycia zewnętrznych frameworków.

Głównym założeniem było dynamiczne budowanie interfejsu (manipulacja DOM) oraz komunikacja z zewnętrznym serwerem.

##Główne funkcjonalności
* **Dynamiczne pobieranie danych:** Asynchroniczne odpytywanie zewnętrznego API (Jooble) za pomocą funkcji `fetch()`.
* **Smart Cache:** Zastosowanie `localStorage` do buforowania ofert na 10 minut, co drastycznie oszczędza limit zapytań do API.
* **Własny Router (Hash Routing):** Aplikacja działa na jednym pliku HTML. Przełączanie między listą ofert, szczegółami a formularzem odbywa się natychmiastowo poprzez nasłuchiwanie zdarzenia `hashchange` w adresie URL (np. `#oferta/123`).
* **Filtrowanie i Sortowanie:** Działająca w czasie rzeczywistym wyszukiwarka tekstowa oraz sortowanie alfabetyczne ofert.
* **Formularz lokalny:** Możliwość dodania własnej oferty, która zapisuje się w pamięci przeglądarki.

##Struktura plików
`index.html` - Punkt wejścia aplikacji. Pusty kontener, do którego JavaScript wstrzykuje całą aplikację.
* `style.css` - Główny arkusz stylów definiujący nowoczesny wygląd elementów.
* `src/` - Główny folder z kodem źródłowym:
  * `main.js` - Serce aplikacji (Entry point). Znajduje się tu Router (`ZbudujStrone()`), który nasłuchuje zmian w adresie URL (hash) i na ich podstawie dynamicznie renderuje odpowiednie widoki. Inicjuje również pierwsze pobranie ofert.
  * **`api/`** (Logika danych)
    * `oferty.js` - Połączenie z API (fetch), zarządzanie pamięcią podręczną (`localStorage`), dodawanie ofert lokalnych oraz przechowywanie głównej tablicy danych (`ofertyLista`).
  * **`components/`** (Komponenty UI i Widoki)
    * `header.js` / `footer.js` - Statyczne komponenty nagłówka i stopki.
    * `menu.js` / `filtry.js` - Zestaw komponentów budujących lewy panel boczny z opcjami filtrów i sortowania.
    * `oferta.js` - Komponent reprezentujący pojedynczą "kartę" ogłoszenia, gotową do wklejenia na listę.
    * `widokLista.js` - Główny widok: renderuje pasek wyszukiwania, zarządza filtrami w czasie rzeczywistym i wyświetla listę ofert.
    * `widokSzczegolow.js` - Widok detali: wyszukuje i prezentuje pełne informacje o klikniętym ogłoszeniu.
    * `widokFormularz.js` - Widok formularza: pozwala użytkownikowi dodać nową, lokalną ofertę.
  * **`utils/`** (Narzędzia)
    * Zawiera pliki pomocnicze, m.in. z funkcją `StworzElement`, która drastycznie przyspiesza proces budowania węzłów DOM.

## Jak uruchomić projekt
Z uwagi na to, że projekt korzysta z nowoczesnych modułów ES6 (`import` / `export`), przeglądarki blokują ich uruchamianie bezpośrednio z dysku (ze względów bezpieczeństwa CORS). 

Aby uruchomić aplikację:
1. Sklonuj repozytorium.
2. Uruchom projekt przez lokalny serwer. W edytorze VS Code najlepiej użyć do tego popularnego rozszerzenia **Live Server** (klikając *Go Live* w prawym dolnym rogu).
