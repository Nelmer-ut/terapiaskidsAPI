# TerapiasKids Store

## Descripción del proyecto

TerapiasKids Store es un e-commerce desarrollado en **React + TypeScript + Vite** para la
psicóloga Elizabeth Rivero Arias. Permite a las familias explorar y "matricularse" en
programas de bienestar emocional para niños, adolescentes y adultos: buscar por nombre,
filtrar por categoría de público objetivo y armar una selección (carrito) con el total a
pagar antes de confirmar la inscripción.

Esta versión es la continuación de la Tarea 1: mantiene el mismo diseño, tarjetas y
componentes, y agrega el **consumo de la API pública [DummyJSON](https://dummyjson.com/docs/products)**
(`https://dummyjson.com/products`) con `fetch` dentro de `useEffect`, manejo de estados de
**carga** (loading), **error** y **datos** (products), y una interfaz responsiva para
desktop y mobile.

## Componentes creados

Todos están en `src/components`, cada uno en su carpeta con su `.tsx` y su `.css`:

| Componente | Descripción |
|---|---|
| **Header** | Logo y nombre de la tienda (TerapiasKids), con el nombre de la profesional. |
| **SearchBar** | Input controlado para buscar programas por nombre. |
| **ProductCard** | Muestra un programa recibido por **props** (nombre, categoría, edad, duración, modalidad, valoración, cupos, características, precio). Maneja la cantidad con `useState`. |
| **ProductList** | Renderiza la lista de `ProductCard` con `map()` y `key`; muestra un mensaje si no hay resultados. |
| **Loader** | Indicador visual de carga mientras se esperan los datos de la API. |
| **ErrorMessage** | Muestra el error cuando falla la API, con botón "Reintentar". |
| **Footer** | Información básica de contacto y ubicación. |
| **Button** | Botón reutilizable con variantes `primary` / `secondary`. |

## Consumo de API

- Endpoint: `https://dummyjson.com/products`, consumido con `fetch` dentro de `useEffect` en `src/App.tsx`.
- Se usa `AbortController` para cancelar las peticiones si el componente se desmonta.
- Estados en `App.tsx`: `products` (datos), `loading` (carga) y `error`.
- Si la API responde con error o falla la red, se muestra `ErrorMessage` y se puede reintentar.
- La búsqueda filtra por nombre (y descripción) sin distinguir mayúsculas/minúsculas, y se puede combinar con las pestañas de categoría.

### Cómo se adaptó la API al servicio profesional

Como el sitio ofrece servicios de psicología, el catálogo muestra únicamente los programas del
servicio, no los productos genéricos de DummyJSON. Para eso:

1. El contenido propio de cada programa (nombre, descripción, categoría, precio en CLP, imagen,
   características) vive en `public/programas.json`.
2. La app consulta la API de DummyJSON y, con el adaptador `src/utils/mergePrograms.ts`, enlaza
   cada programa con el producto de la API que tiene el mismo `id`.
3. De la API se toman `rating` (valoración) y `stock` (cupos disponibles), que se muestran en la
   tarjeta. Son **datos de demostración** de la API pública.

## Tecnologías usadas

- React 18
- TypeScript
- Vite
- CSS puro (variables CSS, flexbox, grid y media queries)
- API pública DummyJSON

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
│   ├── product.ts
│   └── apiProduct.ts
├── utils/
│   └── mergePrograms.ts
├── App.tsx
└── main.tsx
```
