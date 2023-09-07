export const createPaymentMethodAdapter = (paymentMethod: any) => {
  return {
    id: paymentMethod.id,
    name: paymentMethod.name,
    createdDate: paymentMethod.createdDate,
    estado: paymentMethod.estado
  };
};

//  export interface Club {
//    id: number,
//    name: string,
//    createdDate: string,
//    estado: boolean
//}
