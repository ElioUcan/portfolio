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

### Tecnologías Base
- **HTML5:** Marcado semántico estructurado (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<nav>`, `<noscript>`).
- **CSS3 Puro:**
  - Variables personalizadas (`:root`) para consistencia cromática y transiciones.
  - Dimensiones, espaciados y tipografía fluidos mediante funciones `clamp()`.
  - Estructuración de layouts mediante CSS Grid y Flexbox moderno.
  - Efectos visuales: `backdrop-filter: blur(16px)` para navegación sticky, fondo radial oscuro y ruido visual animado con SVG fractal (`.grain`).
  - Accesibilidad: Soporte para `@media (prefers-reduced-motion: reduce)` y estados `:focus-visible` optimizados.
- **JavaScript Vanilla:** Script minimalista (< 25 líneas) embebido en `index.html` para:
  - Estilo sólido del header al hacer scroll (`.nav--solid`).
  - Detección de entrada en viewport con `IntersectionObserver` para animaciones suaves (`.reveal.is-visible`).
- **Google Fonts:**
  - `Epilogue`: Familia display sans-serif (pesos 400, 600, 700, 800) para encabezados, títulos y texto editorial.
  - `Martian Mono`: Familia monospace (pesos 400, 500, 600) para metadatos, números tabulares, etiquetas y botones.

### Paleta de Colores Principal
- Fondo oscuro principal: `--bg: #09070E`
- Fondo de tarjetas/superficies: `--surface: #120E1A`
- Bordes y separadores: `--border: #231C30`
- Texto principal: `--text: #EDE9F5`
- Texto secundario / muted: `--muted: #B8A8D6`
- Acento eléctrico: `--accent: #A259FF`

---

## 4. Secciones y Contenido del Sitio

1. **Header / Barra de Navegación:**
   - Logotipo/Monograma "ELIO UCÁN".
   - Enlaces internos: `#projects`, `#skills`, `#contact`.
   - Botón de descarga de CV: `assets/Elio_Resume.pdf`.
2. **Hero:**
   - Nombre principal y propuesta de valor enfocada a Data e IA.
   - Badge de estado / disponibilidad inmediata para pasantías.
   - Acciones principales (Resume, GitHub, LinkedIn).
3. **Métricas de Impacto (Stats Bar):**
   - 05 Projects Shipped, 06 Certifications, AWS Certified Engineer, C1 English (iTEP 4.7).
4. **Acerca de (About):**
   - Declaración de enfoque técnico en arquitectura de datos y DevOps.
5. **Proyectos Destacados (Projects):**
   - *01. DC Operations Dashboard*: Streamlit, Plotly, Docker, Terraform, AWS (Data center 100 MW).
   - *02. ETL Pipeline (CoinGecko REST API)*: Airflow, Docker, PostgreSQL.
   - *03. Infrastructure as Code*: Terraform, AWS (EC2 + S3).
   - *04. AI Agent*: Anthropic API, FastAPI, memoria persistente en EC2.
   - *05. better-readmes*: Herramienta open-source / skill de Claude Code en npm/npx.
6. **Habilidades Técnicas (Skills Grid):**
   - 6 categorías: Languages, ETL & Pipeline, Cloud & IaC, Data, AI & ML, Dev Tools.
7. **Certificaciones y Premios:**
   - 6 credenciales (AWS, DataCamp) y 2 premios (Datathon UPY 2025, Olimpiadas Holberton 2025).
8. **Educación:**
   - Universidad Politécnica de Yucatán (Ingeniería de Datos e Inteligencia Artificial).
   - Holberton School Mérida (DevOps Engineering).
9. **Footer & Contacto:**
   - Correo electrónico: `elioeduardo06@gmail.com`.
   - Enlaces a redes sociales y plataformas profesionales.

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
2. **Preservar la identidad de marca (`PRODUCT.md`):**
   Evitar clichés de diseño (temas genéricos de VS Code, estilos corporativos aburridos o páginas saturadas de WebGL). Mantener el tono *Precision-engineering dark* con tipografía Epilogue y Martian Mono.
3. **Manejo de rutas relativas:**
   Todos los enlaces a recursos (`style.css`, `images/*`, `assets/*`) deben mantenerse relativos para garantizar compatibilidad tanto en local como en GitHub Pages.
4. **Verificación de responsividad y accesibilidad:**
   - Comprobar que cualquier nuevo bloque visual sea compatible con pantallas pequeñas (`@media (max-width: ...)`).
   - Mantener ratios de contraste legibles (WCAG AA) y estados de foco visibles.

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
