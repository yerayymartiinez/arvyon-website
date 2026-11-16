# ARVYON — AI & Automation Studio

Página web corporativa de **ARVYON**, un estudio especializado en inteligencia artificial, automatizaciones y sistemas digitales para negocios.

## Tecnologías

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- JavaScript (Vanilla ES6)
- Google Fonts (Inter)

## Estructura

```
arvyon-web/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── assets/
    └── img/
        ├── logo-arvyon.png
        └── favicon-arvyon.png
```

## Ejecutar en local

Abrir `index.html` directamente en el navegador. No requiere servidor ni proceso de compilación.

Para desarrollo con recarga automática se puede utilizar cualquier servidor estático:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve .
```

## Despliegue

El proyecto es estático y se puede publicar en cualquier servicio de hosting:

- **GitHub Pages** — directamente desde la rama `main`.
- **Netlify** — conectando el repositorio.
- **Vercel** — importando el proyecto.

## Formulario de contacto

El formulario valida los campos en el frontend y está preparado para conectarse a un servicio externo. Buscar el comentario `INTEGRACIÓN BACKEND` en `js/script.js` para añadir el endpoint.

## Licencia

© 2026 ARVYON. Todos los derechos reservados.
