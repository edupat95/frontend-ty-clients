export const createSaleAdapter = (sale: any) => {
    try {
      return {
        id: sale.id,
        costoTotal: sale.costoTotal,
        costoTotalPuntos: sale.costoTotalPuntos,
        identificadorTicket: sale.identificadorTicket,
        entregado: sale.entregado,
        formaPago: sale.formaPago,
        createdDate: sale.createdDate,
        updatedDate: sale.updatedDate,
        cajero: sale.cajero,
        asociado: sale.asociado
      };
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
      return null;
    }
  };


//  export interface Sale {
//    id: number,
//    costoTotal: number,
//    costoTotalPuntos: number,
//    identificadorTicket: string,
//    entregado: boolean,
//    createdDate: string,
//    updatedDate: string,
//    formaPago: string,
//    cajero: Cashier,
//    asociado: string
//}

