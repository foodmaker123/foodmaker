# ZdrowaDieta — strona sprzedażowa e-booka

Oficjalna strona e-booka **„Zdrowa dieta dla zapracowanych”**. Statyczny, responsywny serwis bez zewnętrznych skryptów śledzących, z lokalnym koszykiem demonstracyjnym i przekierowaniem do rzeczywistej płatności na Naffy.

## Adresy i publikacja

- Adres strony: https://zdrowadieta.shop/
- Projekt Cloudflare Pages: `foodmaker`
- Techniczny adres Pages: https://foodmaker-52h.pages.dev/
- Repozytorium: `foodmaker123/foodmaker`, gałąź `main`
- Wdrażanie: automatyczne z `main`, pod warunkiem aktywnego połączenia GitHub → Cloudflare Pages
- Adres produktu Naffy: https://www.naffy.io/zdrowa-dieta/zdrowadieta-krx

## Pliki

- `index.html` — strona ofertowa, cena, FAQ, lokalny koszyk i odnośniki do płatności Naffy
- `ebook-cover.svg` — ilustracja okładki na stronie; nie zastępuje sprzedawanego pliku PDF
- `favicon.svg` — ikona strony
- `regulamin.html` — regulamin sprzedaży e-booka
- `polityka-prywatnosci.html` — informacje RODO, odbiorcy danych i techniczna obsługa strony
- `prawa-konsumenta.html` — informacje o odstąpieniu, reklamacjach i dostawie
- `robots.txt`, `sitemap.xml` — podstawowe pliki indeksowania strony

## Potwierdzony proces zakupu

1. Produkt kosztuje **29,99 zł** (płatność jednorazowa, bez abonamentu).
2. Płatności BLIK i kartą, obsługa Stripe przez Naffy.
3. Klient otrzymuje e-mail od Naffy z odnośnikiem do produktu.
4. Naffy wyświetla zgody dotyczące cyfrowej dostawy przed pobraniem pliku oraz zapisuje datę ich zaakceptowania.
5. Po akceptacji klient otrzymuje PDF z indywidualnym znakiem wodnym (adres e-mail kupującego).

Wszystkie powyższe kroki poza konfiguracją konta Naffy zostały zaobserwowane w zakupie testowym z 11 listopada 2026 r.

## Zwroty i zgodność

- Nie ma dobrowolnej, dodatkowej gwarancji zwrotu pieniędzy.
- Zachowane są ustawowe prawa odstąpienia i reklamacji.
- Utrata prawa odstąpienia od umowy na zakup e-booka jest możliwa wyłącznie po spełnieniu wszystkich warunków ustawowych, w tym wymaganego potwierdzenia na trwałym nośniku.
- **Do potwierdzenia z Naffy:** czy sprzedawca lub platforma przekazuje nabywcy wymagane potwierdzenie zaakceptowanych zgód na trwałym nośniku w rozumieniu art. 21 ustawy o prawach konsumenta.
- Należy zapewnić zgodność dokumentów udostępnianych w samym koszyku Naffy z aktualnymi stronami `regulamin.html` i `polityka-prywatnosci.html` na domenie.

## Ograniczenia i bezpieczeństwo

- Nie należy umieszczać płatnego PDF w repozytorium ani na publicznym hostingu stron.
- Zdjęcia potraw na stronie są ilustracyjne (Unsplash), a nie dokumentują przygotowania konkretnych potraw z PDF.
- Local cart działa tylko w aktualnie otwartej karcie i **nie pobiera płatności**.
- Plik PDF został dostarczony w teście; rzeczywista dostępność produkcyjnej witryny i aktualizacja wdrożenia Cloudflare wymagają sprawdzenia z przeglądarki.
- Prowadzenie działalności nierejestrowanej wymaga spełnienia aktualnych ustawowych warunków, w tym limitu przychodów i ewidencji.

## Podgląd lokalny

Otwórz `index.html` w przeglądarce. Fotografie z Unsplash wymagają dostępu do internetu.

*Ostatni przegląd repozytorium: 12 listopada 2026 r.*
