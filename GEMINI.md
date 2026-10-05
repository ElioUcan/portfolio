# GEMINI.md — Guía del Repositorio: Portfolio (elioucan.dev)

Este documento sirve como guía contextual, técnica y operativa para agentes de IA y desarrolladores que interactúen con el repositorio del portafolio web personal de **Elio Eduardo Ucán Zapata**.

---

## 1. Visión General del Proyecto

- **Propietario:** Elio Eduardo Ucán Zapata ([@eliotito](https://github.com/eliotito)).
- **Enfoque profesional:** Estudiante de Ingeniería de Datos e Inteligencia Artificial (Mérida, México) con especialización en DevOps.
- **Propuesta de valor:** *"Building ETL Pipelines · Cloud Infrastructure · AI-Powered APIs"*.
- **Dominio de producción:** [elioucan.dev](https://elioucan.dev).
- **Alojamiento:** GitHub Pages vía GitHub Actions (`gh-pages`).
- **Filosofía arquitectónica:** *Zero-framework / Static-first discipline*. Sin bundlers pesados, sin dependencias de Node.js en runtime, velocidad de carga instantánea y semántica estricta.

---

## 2. Estructura del Repositorio

```
/home/eliotito/portfolio
├── .github/
│   └── workflows/
│       └── deploy.yml              # Workflow de CI/CD para GitHub Pages
├── .impeccable/                    # Historial y auditorías de diseño UI
│   ├── critique/
│   │   └── 2026-06-10T03-55-55Z__index-html.md
│   └── live/
│       └── config.json
├── assets/
│   └── Elio_Resume.pdf             # Curriculum Vitae en PDF descargable
├── images/                         # Badges de certificaciones y logotipos institucionales
│   ├── aws-data-engineer.png       # AWS Academy Data Engineer
│   ├── aws-cloud-foundations.png   # AWS Academy Cloud Foundations
│   ├── DEAssociatebadge.png        # DataCamp Associate Data Engineer
│   ├── dataanalyst.png             # DataCamp Data Analyst in Power BI
│   ├── dbdesign.png                # DataCamp Database Design
│   ├── snowflakedatacamp.png       # DataCamp Snowflake SQL
│   ├── holberton.png               # Holberton School Mérida
│   └── upy.jpg                     # Universidad Politécnica de Yucatán
├── .gitignore                      # Exclusiones de Git (node_modules, etc.)
├── CNAME                           # Configuración de dominio personalizado (elioucan.dev)
├── PRODUCT.md                      # Estrategia de producto, tono, audiencia y principios de marca
├── GEMINI.md                       # Guía contextual del repositorio para agentes IA
├── index.html                      # Documento principal SPA (Single Page Application)
└── style.css                       # Hoja de estilos centralizada (Sistema de diseño)
```

---

## 3. Stack Tecnológico y Sistema de Diseño

### Estética de Diseño: Swiss-Editorial Engineering
Influencias directas de **Utrecht.jp**, **Swissted.com**, **Antfu.me** y **Dappboi.com**.
El sistema se basa en el rigor editorial suizo: grillas estrictas con bordes visibles hairline de 1px, alto contraste, tipografía arquitectónica asimétrica y una paleta inspirada en papel de archivo técnico con acentos en verde terminal de consola. Se eliminaron por completo las decoraciones superficiales ("vibecoded", gradientes morados oscuros, capas de ruido SVG fractal y sombras difusas).

### Tecnologías Base
- **HTML5:** Marcado semántico estructurado (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<nav>`, `<noscript>`).
- **CSS3 Puro:**
  - Variables personalizadas (`:root`) para el sistema cromático y espaciados.
  - Dimensiones, espaciados y tipografía fluidos mediante funciones `clamp()`.
  - Estructuración de layouts mediante CSS Grid con separadores de 1px y Flexbox moderno.
  - Contraste estricto conforme a WCAG AA/AAA.
  - Accesibilidad: Soporte para `@media (prefers-reduced-motion: reduce)`, foco visible con outline esmeralda y enlaces skip-to-content.
- **JavaScript Vanilla:** Script minimalista embebido en `index.html` para:
  - Detección de entrada en viewport con `IntersectionObserver` para revelado sutil (`.reveal.is-visible`).
- **Google Fonts:**
  - `Epilogue`: Familia display sans-serif (pesos 600, 700, 800) para encabezados, títulos y jerarquía arquitectónica.
  - `Martian Mono`: Familia monospace (pesos 400, 500, 600) para metadatos técnicos, números tabulares de catálogo `[01]`, métricas de ingeniería, tags y botones.

### Paleta de Colores (Modo Claro Papel de Archivo + Terminal Emerald)
- Papel de archivo principal: `--bg: #F7F6F2`
- Superficie limpia: `--bg-surface: #FFFFFF`
- Papel secundario / sutil: `--bg-subtle: #EFECE4`
- Línea divisoria hairline: `--border: #DDD8CD`
- Borde estructural / tinta negra: `--border-strong: #111215`
- Tinta negra pura de alto contraste: `--text: #111215` (contraste >16:1, WCAG AAA)
- Gris grafito de lectura: `--text-muted: #52555F` (contraste >6:1, WCAG AA/AAA)
- Gris para metadatos secundarios: `--text-dim: #848792`
- Acento Terminal Emerald: `--accent: #059669` (contraste 4.54:1, WCAG AA)
- Acento hover: `--accent-hover: #047857`
- Acento sutil (fondos de tags y métricas): `--accent-muted: rgba(5, 150, 105, 0.08)`
- Borde de acento: `--accent-border: rgba(5, 150, 105, 0.35)`

---

## 4. Secciones y Contenido del Sitio

1. **Header / Barra de Navegación Sticky:**
   - Logotipo editorial "ELIO UCÁN // DATA & AI".
   - Enlaces de navegación: `#projects` (Work), `#skills` (Skills), `#certs` (Credentials), `#education` (Education), `#contact` (Contact).
   - Botón de descarga directa de CV: `assets/Elio_Resume.pdf`.
2. **Hero Editorial:**
   - Metadatos de ingeniería: `REF: DATA ENGINEERING · DEVOPS · AI SYSTEMS` y localización/disponibilidad.
   - Gran impacto tipográfico: `ELIO EDUARDO UCÁN ZAPATA` con subtítulo `BUILDING DATA PIPELINES & AI`.
   - Síntesis profesional directa y concisa.
   - Botones de acción de alto contraste (Download CV [PDF], GitHub, LinkedIn, Email).
3. **Barra de Métricas (Stats Ledger):**
   - Cuadrícula técnica de 4 columnas: `05` Projects Shipped, `06` Certifications, `AWS` Certified Engineer, `C1` English (iTEP 4.7).
4. **Acerca de (About / Thesis):**
   - Planteamiento conciso del enfoque en infraestructura de datos, reproducibilidad y despliegue cloud.
5. **Catálogo de Proyectos Indexado (Projects):**
   - Índice numérico `[01]` a `[05]`, tags semánticos, métricas técnicas destacadas (SLA 99.982%, <1% Failure Rate, -90% Provisioning, etc.) y enlaces directos a código/demo:
     * *01. DC Operations Dashboard*: Streamlit, Plotly, Docker, Terraform, AWS.
     * *02. ETL Pipeline (CoinGecko REST API)*: Airflow, Docker, PostgreSQL, pandas.
     * *03. Infrastructure as Code*: Terraform, AWS (EC2 + S3), IAM.
     * *04. AI Agent*: Anthropic API, FastAPI, Docker, memoria persistente PostgreSQL.
     * *05. better-readmes*: Claude Code skill / CLI open-source publicado en npm/npx.
6. **Habilidades Técnicas (Technical Skills Grid):**
   - Grilla de 6 dominios: Languages, ETL & Pipeline, Cloud, Data, AI, Dev Tools.
7. **Credenciales y Reconocimientos (Credentials & Awards):**
   - 6 certificaciones normalizadas (AWS, DataCamp) con enlaces a Credly y certificados oficiales.
   - 2 reconocimientos competitivos (Datathon UPY 2025, Olimpiadas Holberton 2025 con beca del 50%).
8. **Educación (Academic Background):**
   - Universidad Politécnica de Yucatán (Ing. Datos e IA).
   - Holberton School Mérida (DevOps Engineering).
9. **Colofón / Footer:**
   - Llamado al contacto directo ("LET'S BUILD RELIABLE SYSTEMS.").
   - Vías de contacto directas (Email, LinkedIn, GitHub, CV).
   - Ficha técnica de colofón (Mérida MX, UTC-6, Zero-framework HTML5/CSS3, Swiss-Editorial Engineering).

---

## 5. CI/CD y Flujo de Despliegue

- **Automatización:** GitHub Actions definido en [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml).
- **Rama origen:** `main` (desencadena despliegue automático en cada `push`).
- **Rama destino:** `gh-pages`.
- **Acción utilizada:** `peaceiris/actions-gh-pages@v3`.
- **Estrategia actual:**
  Se crea una carpeta temporal `_site`, se copian los archivos estáticos (`index.html`, `style.css`, `CNAME`, `assets`, `images`), se pasa el parámetro `cname: elioucan.dev` y se publica en la rama `gh-pages`.

---

## 6. Reglas y Directrices de Desarrollo

Al realizar cambios o mejoras en este repositorio, los agentes y desarrolladores deben respetar las siguientes directrices:

1. **Mantener la disciplina Zero-Framework:**
   No añadir frameworks pesados de frontend (React, Vue, Next.js, etc.) ni empaquetadores complejos a menos que el usuario lo solicite expresamente. La esencia del portafolio es la ligereza extrema y el rendimiento nativo.
2. **Preservar la identidad Swiss-Editorial Engineering:**
   Evitar efectos decorativos innecesarios (sombras neón, fondos oscuros genéricos, animaciones flotantes aleatorias). Mantener la claridad tipográfica, las líneas divisorias nítidas de 1px y la coherencia en la paleta Papel de Archivo + Terminal Emerald.
3. **Manejo de rutas relativas:**
   Todos los enlaces a recursos (`style.css`, `images/*`, `assets/*`) deben mantenerse relativos para garantizar compatibilidad tanto en local como en GitHub Pages.
4. **Verificación de responsividad y accesibilidad:**
   - Comprobar que cualquier nuevo bloque visual sea compatible con pantallas pequeñas (`@media (max-width: ...)`).
   - Mantener ratios de contraste legibles (WCAG AA/AAA) y estados de foco visibles.

---

## 7. Deuda Técnica y Estado de Resolución

Todos los puntos de deuda técnica prioritarios identificados han sido subsanados con éxito:

1. **[RESUELTO] Copia del `CNAME` en CI/CD:**
   En [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml), se implementó la copia explícita `cp CNAME _site/` y el parámetro `cname: elioucan.dev` en `peaceiris/actions-gh-pages@v3`. Esto asegura la persistencia indiscutible del dominio personalizado en GitHub Pages en cada ejecución del workflow.
2. **[RESUELTO] Accesibilidad / Contraste (WCAG AA):**
   Se actualizó `--muted` a `#B8A8D6` (~9.1:1 contra `--bg: #09070E` y ~8.5:1 contra `--bg-card: #150F1E`), superando ampliamente el mínimo de 4.5:1 exigido por WCAG AA. Además, se ajustaron `--muted-dim` (`#9B8BBF`) y el color de las etiquetas `.project__tags .tag` a `var(--accent)` para eliminar cualquier contraste insuficiente.
3. **[RESUELTO] Metadatos Sociales y SEO:**
   En [`index.html`](file:///index.html) se agregaron etiquetas completas de Open Graph (`og:title`, `og:description`, `og:url`, `og:type`, `og:image`), Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) y el tag `<link rel="canonical" href="https://elioucan.dev/">`, garantizando una indexación limpia y previews enriquecidas al compartirse en LinkedIn y X/Twitter.
4. **[RESUELTO] Consistencia y Normalización de Nombres de Archivos:**
   Se normalizaron los nombres en `images/` mediante `git mv` (`aws-data-engineer.png`, `aws-cloud-foundations.png`, `snowflakedatacamp.png`) y se actualizaron correspondientemente todas las referencias en [`index.html`](file:///index.html) sin romper ningún recurso ni vínculo.
