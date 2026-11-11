# ZdrowaDieta — strona sprzedażowa e-booka

Responsywny, statyczny landing page dla e-booka **„Zdrowa dieta dla zapracowanych”**.

## Publikacja

Strona działa bez Node.js i procesu budowania. Repozytorium jest podłączone do Cloudflare Pages:

- Projekt Pages: `foodmaker`
- Gałąź produkcyjna: `main`
- Publikacja: automatyczna po commitach na `main`, jeśli integracja Cloudflare jest aktywna
- Adres docelowy: https://zdrowadieta.shop/
- Adres techniczny Pages: https://foodmaker-52h.pages.dev/

## Struktura

- `index.html` — strona główna (HTML, CSS, JavaScript)
- `favicon.svg` — ikona strony
- `regulamin.html`, `polityka-prywatnosci.html`, `prawa-konsumenta.html` — projekty dokumentów prawnych z polami do uzupełnienia

## Zawartość

- Duża sekcja hero z fotografią potrawy i stylizowanym mockupem okładki
- Kroki korzystania z e-booka, autentyczne informacje o zawartości PDF
- Interaktywny podgląd fragmentu spisu treści, jadłospisu i listy zakupów
- Koszyk jednego e-booka (dodaj/usuń) i przekierowanie do zewnętrznej płatności Naffy
- Zdjęcia ilustracyjne posiłków (Unsplash, ładowane z serwera Unsplash; NIE są to zdjęcia rzeczywistych przepisów z PDF)
- FAQ, czytelna oferta i mobilny pasek CTA
- Animacje respektujące ustawienie `prefers-reduced-motion`

## Przed uruchomieniem sprzedaży

1. Cena widoczna na stronie to **29,99 zł**. Upewnij się, że cena w koszyku jest identyczna.
2. Przyciski zakupu i koszyk są podłączone do oferty Naffy: https://www.naffy.io/przemek-lampa/zdrowadieta-krx. Własna strona nie realizuje transakcji — przekierowuje do Naffy. Przed promocją sprawdź, czy na Naffy aktywowano Stripe, dodano właściwy plik PDF i udostępniono produkt.
3. Pełny, płatny PDF wgraj WYŁĄCZNIE do platformy sprzedażowej. Nie publikuj PDF w repozytorium ani statycznych plikach hostingu.
4. Uzupełnij prawdziwe dane sprzedawcy i dokumenty prawne, następnie sprawdź ich zgodność z koszykiem i obowiązującymi przepisami.
5. Wykonaj test płatności i automatycznego dostarczania e-booka.
6. Sprawdź dostępność mobilną, szybkość ładowania zdjęć zewnętrznych i działanie HTTPS na żywej domenie.

## Lokalny podgląd

Otwórz `index.html` w przeglądarce. Zdjęcia z Unsplash wymagają połączenia z internetem.

> Stylizowany mockup w hero odzwierciedla treść i kolorystykę e-booka, ale nie jest bitmapową kopią oryginalnej okładki PDF.
