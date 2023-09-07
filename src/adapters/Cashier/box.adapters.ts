export const createCashierAdapter = (box: any) => ({
    id: box.id,
    plataDeCambio: box.plataDeCambio,
    worker: box.trabajador,
    estado: box.estado,
    createdDate: box.createdDate,
    updatedDate: box.updatedDate
});
  
