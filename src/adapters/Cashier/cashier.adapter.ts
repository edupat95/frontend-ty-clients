export const createCashierAdapter = (cashier: any) => ({
    id: cashier.id,
    plataDeCambio: cashier.plataDeCambio,
    type: cashier.tipo,
    worker: cashier.trabajador,
    estado: cashier.estado,
    box: cashier.caja
});
  
  