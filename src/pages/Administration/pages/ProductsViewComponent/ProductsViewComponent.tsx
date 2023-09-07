import React, { useEffect, useState } from 'react'
import { Product } from '../../../../models/Cashier/product.model';
import { getProductsInClub } from '../../services/products.services';
import FormToAddProducts from './FormToAddProducts';
import ListOfProductsInClub from './ListOfProductsInClub';

const ProductsViewComponent = () => {
  const [productsInClub, setProductsInClub] = useState<Product[]>([]);
  
  useEffect(() => {
    getProductsInClub().then((data) => {
      setProductsInClub(data);
    })

  }, []);

  const reloadData = async () => {
    getProductsInClub().then((data) => {
      setProductsInClub(data);
    }).catch(e => {
      alert("Ocurrio un error");
      console.error("Error al intentar buscar los productos del club. Type error -> " + e.response.status);
    });
  }

  return (
    <div style={{display: "flex"}}>
        <div style={{ margin: "50px", width: "30%"}}>
          <FormToAddProducts 
            reloadData={reloadData}
          />
        </div>
        <div style={{ borderRadius: "2%",height: "650px", overflowY: "scroll", textAlign: "center", alignItems: "center", backgroundColor: "GrayText" ,margin: "50px", width: "70%"}}>
          <ListOfProductsInClub 
            productsInClub={productsInClub}
            reloadData={reloadData}
          />
        </div>
    </div>
  )
}
export default ProductsViewComponent;