import { Product } from '../types/product';
import { ApiProduct } from '../types/apiProduct';

/**
 * Une el contenido propio del servicio (programas.json) con los datos que entrega la API
 * de dummyjson. Cada programa se enlaza con el producto de la API que tiene el mismo id y
 * toma de él:
 *   - rating -> valoración del programa
 *   - stock  -> cupos disponibles
 * El resto (nombre, descripción, precio en CLP, imagen, etc.) es contenido propio.
 */
export const mergeProgramsWithApi = (programs: Product[], apiProducts: ApiProduct[]): Product[] => {
  const byId = new Map(apiProducts.map((item) => [item.id, item]));

  return programs.map((program) => {
    const reference = byId.get(program.id);
    return {
      ...program,
      rating: reference?.rating,
      stock: reference?.stock,
    };
  });
};
