import React, { useEffect, useState } from 'react'
import ErrorMessageComponent from '../../../../components/ErrorMessageComponent';
import { Box } from '../../../../models/Cashier/box.model';
import { Product } from '../../../../models/Cashier/product.model';
import { getBoxesInClub, getProductsInBox, removeProductInBox, setProductInBox } from '../../services/boxes.services';
import ListBoxesComponent from './ListBoxesComponent'
import ListOfProductsInBox from './ListOfProductsInBox';
import ListOfProductsInClub from './ListOfProductsInClub';

const BoxesViewComponent = () => {

  const [boxes, setBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState<Box | undefined>(undefined);
  const [productsInBox, setProductsInBox] = useState<Product[] | undefined>([]);
  const [message, setMessage] = useState<{ visible: boolean, type: string, message: string }>({ visible: false, type:"", message: "" });

  useEffect(() => {
    getBoxesInClub().then((data) => {
      setBoxes(data);
    }).catch(e => {
      alert("Ocurrio un error");
      console.error("Error al intentar buscar los productos del club. Type error -> " + e.response.status);
    });
  }, []);

  useEffect(() => {
    if(selectedBox){
      getProductsInBox(selectedBox).then((data) => {
        //console.log(data);  
        setProductsInBox(data);
      }).catch(e => {
        alert("Ocurrio un error");
        console.error("Error al intentar buscar los productos del club. Type error -> " + e.response.status);
      })
    }
  }, [selectedBox]);
  
  const loadProduct = async (product: Product) => {
    if (selectedBox === undefined) {
      setMessage({ visible: true,type: "error", message: "Debe seleccionar una caja primero" });
      //alert("Debe seleccionar una caja primero");
      return;
    } else if (productsInBox) {
      const productInBox = productsInBox?.find((e) => e.id === product.id);
      if (productInBox) {
        setMessage({ visible: true, type:"error" , message: "El producto ya se encuentra en la caja" });
        //alert("El producto ya se encuentra en la caja");
        return;
      }
      await setProductInBox(selectedBox, product).then((data) => {
        if (data === 200) {
          const newProductsInBox = productsInBox?.concat(product);
          setProductsInBox(newProductsInBox);
        } else {
          alert("Ocurrio un error al intentar cargar el producto");
        }})
    } 
    //console.log("Producto a cargar: " + product.nombre + "A la caja: " + selectedBox?.nombre)
  }

  const removeProduct = async (product: Product) => {
    if (selectedBox === undefined) {
      alert("Debe seleccionar una caja primero");
      return;
    }else{
      await removeProductInBox(selectedBox, product).then((data) => {
        if (data === 204) {
          const newProductsInBox = productsInBox?.filter((e) => e.id !== product.id);
          setProductsInBox(newProductsInBox);    
        } else {
          setMessage({ visible: true, type:"error" , message: "Ocurrio un error al intentar eliminar el producto" });
          //alert("Ocurrio un error al intentar eliminar el producto");
        }})
    }
  }

  return (
    <div style={{ display: "flex" }}>
      {message.visible && (
        <div style={{ position: "absolute", top: "50", left: 0, right: 0, height: "150px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <ErrorMessageComponent
            message={message}
            setMessage={setMessage}
          />
        </div>
      )}
      <div style={{ width: "50%", margin: "50px" }}>
        <div style={{ borderRadius: "2%", height: "650px", overflowY: "scroll", textAlign: "center", alignItems: "center", backgroundColor: "GrayText", margin: "20px" }}>
          <ListOfProductsInClub
            loadProduct={loadProduct}
          />
        </div>
      </div>
      <div style={{ width: "50%", margin: "20px" }}>
        <div>
          <div>
            <ListBoxesComponent
              boxes={boxes}
              setSelectedBox={setSelectedBox}
              selectedBox={selectedBox}
            />
          </div>
          {productsInBox ? (
            <div style={{ borderRadius: "2%", height: "650px", overflowY: "scroll", textAlign: "center", alignItems: "center", backgroundColor: "GrayText", margin: "10px", width: "100%" }}>
              <ListOfProductsInBox
                products={productsInBox}
                removeProduct={removeProduct}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default BoxesViewComponent