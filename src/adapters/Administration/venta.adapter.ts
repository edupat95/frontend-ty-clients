export const createVentaAdapter = (venta: any) => ({
    id: venta.id,
    costoTotal: venta.costoTotal,
    costoTotalPuntos: venta.costoTotalPuntos,
    fechaVenta: venta.fechaVenta,
    productoVentas: venta.productoVentas,
    idCajero: venta.idCajero,
    idAsociado: venta.idAsociado
});
