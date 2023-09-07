export const createProductAdapter = (product: any) => ({
  id: product.id,
  nombre: product.nombre,
  costo: product.costo,
  precio: product.precio,
  precioPuntos: product.precioPuntos,
  puntosRecompensa: product.puntosRecompensa,
  descripcion: product.descripcion,
  estado: product.estado
});
  
