import { ProductoVenta } from "../../../models/Administration/productoVenta.model";
import { Venta } from "../../../models/Administration/venta.model";
import { ProductInCart } from "../../../models/Cashier/productInCart.model";
const getProductosYCantidades = (productosVenta: Array<ProductoVenta>) => {
  
  //Este arreglo va a contener los productos de las ventas sin repetir el id.
  let allProducts: Array<ProductInCart> = [];
  
  productosVenta.map((productoVenta) => {
    //Este Arreglo es para guardar los productos de cada venta donde los id de los productos se pueden repetir
    let allProductsAux: Array<ProductInCart> = [];

    //Esta variable auxiliar la utilizo para formar el objeto ProductInCart. Que solo posee el producto y la cantidad.
    let auxProduct: ProductInCart = {
      product: productoVenta.idProducto,
      quantity: productoVenta.cantidad
    }

    //Agrego el producto en el arreglo auxiliar
    allProductsAux.push(auxProduct);
    
    allProductsAux.map((productInCart) => {
      //Busco si el producto ya esta en el arreglo de productos sin repetir el id
      const productIndex = allProducts.findIndex((product) => product.product.id === productInCart.product.id);
      //Si el producto no esta en el arreglo de productos sin repetir el id, lo agrego
      if (productIndex === -1) {
        allProducts.push(productInCart);
      } else {
        //Si el producto ya esta en el arreglo de productos sin repetir el id, le sumo la cantidad del producto que se esta agregando
        allProducts[productIndex].quantity += productInCart.quantity;
      }
    });
  });
  
  return allProducts;
};

const getSalesConsumers = async (ventas: Array<Venta>) => {
  console.log("VENTAS QUE LLEGAN-> " + ventas.length);
}


export { getProductosYCantidades, getSalesConsumers };