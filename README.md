# TerapiasKids Store

## Descripción del proyecto

TerapiasKids Store es un e-commerce desarrollado en **React + TypeScript + Vite** para la
psicóloga Elizabeth Rivero Arias. Permite a las familias explorar y "matricularse" en
programas de bienestar emocional para niños, adolescentes y adultos: buscar por nombre,
filtrar por categoría de público objetivo y armar una selección (carrito) con el total a
pagar antes de confirmar la inscripción.

Esta versión es la continuación de la Tarea 1: mantiene el mismo diseño, tarjetas y
componentes, y agrega el **consumo de datos con `fetch` dentro de `useEffect`**, con manejo
de estados de **carga** (loading), **error** y **datos** (products), y una interfaz
responsiva para desktop y mobile.

## Componentes creados

Todos están en `src/components`, cada uno en su carpeta con su `.tsx` y su `.css`:

| Componente | Descripción |
|---|---|
| **Header** | Logo y nombre de la tienda (TerapiasKids), con el nombre de la profesional. |
| **SearchBar** | Input controlado para buscar programas por nombre. |
| **ProductCard** | Muestra un programa recibido por **props** (nombre, categoría, edad, duración, modalidad, características, precio). Maneja la cantidad con `useState`. |
| **ProductList** | Renderiza la lista de `ProductCard` con `map()` y `key`; muestra un mensaje si no hay resultados. |
| **Loader** | Indicador visual de carga mientras se esperan los datos. |
| **ErrorMessage** | Muestra el error cuando falla la petición, con botón "Reintentar". |
| **Footer** | Información básica de contacto y ubicación. |
| **Button** | Botón reutilizable con variantes `primary` / `secondary`. |

## Consumo de datos

- Los programas se obtienen con `fetch('/programas.json')` dentro de `useEffect` (`src/App.tsx`).
- Se usa `AbortController` para cancelar la petición si el componente se desmonta.
- Estados en `App.tsx`: `products` (datos), `loading` (carga) y `error`.
- Si la respuesta no es exitosa o falla la red, se muestra `ErrorMessage` y se puede reintentar.
- La búsqueda filtra por nombre (y descripción) sin distinguir mayúsculas/minúsculas, y se puede combinar con las pestañas de categoría.
- Los datos viven en `public/programas.json`; cada programa tiene `id`, `name`, `category`, `price`, `image` y otros campos propios del servicio.

## Tecnologías usadas

- React 18
- TypeScript
- Vite
- CSS puro (variables CSS, flexbox, grid y media queries)

## Instrucciones para ejecutar el proyecto

1. Clonar el repositorio y entrar a la carpeta del proyecto.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador la URL que indique la terminal (por ejemplo `http://localhost:5173`).

Build de producción:
```bash
npm run build
```

## Capturas de pantalla

**Vista general**

![Vista general](./docs/vista-general.png)

**Loading / búsqueda funcionando**

![Búsqueda funcionando](./docs/busqueda.png)

## Estructura del proyecto

```
public/
├── images/
└── programas.json
src/
├── components/
│   ├── Header/
│   ├── SearchBar/
│   ├── ProductCard/
│   ├── ProductList/
│   ├── Loader/
│   ├── ErrorMessage/
│   ├── Button/
│   └── Footer/
├── types/
│   └── product.ts
├── App.tsx
└── main.tsx
```
