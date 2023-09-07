export const createProductInCartAdapter = (productInCart: any) => ({
    product: productInCart.producto,
    quantity: productInCart.cantidad
  });
    
  