export const createProductoVentaAdapter = (productoVenta: any) => ({
    id: productoVenta.id,
    costoTotal: productoVenta.costoTotal,
    costoTotalPuntos: productoVenta.costoTotalPuntos,
    cantidad: productoVenta.cantidad,
    idVenta: productoVenta.idVenta,
    idProducto: productoVenta.idProducto
});