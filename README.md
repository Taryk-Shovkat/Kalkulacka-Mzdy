# Kalkulačka Mzdy

Jednoduchá webová aplikace pro výpočet mzdy a export výsledků do PDF formátu.

## Struktura projektu

```
tax-calculator/
│
├── index.html         # Hlavní HTML soubor
├── README.md          # Tento soubor
│
├── css/
│   └── styles.css     # Styly pro aplikaci
│
├── js/
│   ├── calculator.js  # Hlavní logika kalkulačky
│   └── pdf-export.js  # Funkce pro export do PDF
│
└── assets/            # Složka pro obrázky a další statické soubory
    └── fonts/         # Fonty pro aplikaci
        └── fonts.js   # Data fontů pro PDF export
```

## Funkce

- Výpočet mzdy na základě:
  - Hrubé mzdy
  - Hodinové mzdy (s možností přidání více řádků)
- Výpočet daní a odvodů
- Export výsledků do PDF dokumentu

## Použité technologie

- HTML5, CSS3, JavaScript
- jsPDF knihovna pro generování PDF souborů
- jsPDF-AutoTable pro tvorbu tabulek v PDF

## Jak používat

1. Otevřete soubor `index.html` v prohlížeči
2. Vyberte režim výpočtu (hrubá mzda nebo hodinová mzda)
3. Zadejte požadované hodnoty
4. Klikněte na tlačítko "Vypočítat"
5. Pro export výsledků do PDF klikněte na tlačítko "Exportovat jako PDF"

## Customizace

- Barvy a vizuální styl lze upravit v souboru `css/styles.css`
- Logiku výpočtu lze upravit v souboru `js/calculator.js`
- Formát exportovaného PDF lze upravit v souboru `js/pdf-export.js` 