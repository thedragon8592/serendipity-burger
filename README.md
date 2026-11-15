# Serendipity Burger — Carta Digital Premium

Carta digital interactiva y experiencia de marca de **Serendipity Burger**, diseñada especialmente para acceso mediante código QR desde smartphones de clientes en mesa y redes sociales.

## Características Principales
- **Fidelidad al 100% de la Carta Oficial**: Todas las categorías, cortes a la parrilla, combos con chaufa y papas, banquetes, milkshakes, jugos, batidos con leche, postres e infusiones extraídos del PDF original.
- **Sección Especial de Banquetes**: Destacado editorial para *Selección Premium*, *Mega Parrilla* y *Banquete Premium*.
- **"Personaliza tu Burger"**: Desglose claro y visual de ingredientes adicionales, carnes parrilleras y selección de cremas artesanales con sus respectivos precios.
- **Buscador en Tiempo Real y Filtros por Categoría**: Los clientes encuentran cualquier plato en segundos.
- **Google Maps y Ubicación**: Sección "Dónde Encontrarnos" con botón directo "Cómo Llegar" para abrir la aplicación de mapas en el celular y horario de atención.
- **Comunidad y Redes Sociales**: Sección "Sigue la Experiencia" para conectar con Instagram, Facebook y TikTok.
- **Ultra Ligero & Rápido**: Peso total empaquetado de ~14 KB (gzipped), carga instantánea en conexiones 3G/4G/5G.
- **Diseño Editorial Gastronómico**: Paleta espresso oscuro, marfil cálido, acentos burdeos y detalles en caramelo/cobre.

## Estructura Modular
- `src/data/menu.js`: Datos centralizados de la carta (categorías, platos, descripciones y precios oficiales).
- `src/data/config.js`: Datos configurables del restaurante (enlace a Google Maps, dirección, horarios y redes sociales).
- `src/styles/main.css`: Sistema de diseño, variables y estilos responsivos (360px hasta escritorio).

## Cómo Ejecutar Localmente
```bash
npm install
npm run dev
```

## Cómo Compilar para Producción
```bash
npm run build
```
La carpeta generada `dist/` puede subirse directamente a cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages o servidor web propio).
