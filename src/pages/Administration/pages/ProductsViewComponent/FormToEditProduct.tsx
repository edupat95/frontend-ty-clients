import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useState, useEffect, FC } from 'react'
import { Product } from '../../../../models/Cashier/product.model';
import { setProduct, updateProductService } from '../../services/products.services';
import ErrorMessageComponent from '../../../../components/ErrorMessageComponent';

interface Props {
  product: Product;
  reloadData: () => void;
  handleCloseEditForm: () => void;
  setMessage: (message: { visible: boolean, type: string, message: string }) => void;
}

const FormToEditProduct: FC<Props> = (
  {
    reloadData,
    product,
    handleCloseEditForm,
    setMessage
  }
) => {
  const [nombre, setNombre] = useState(product.nombre);
  const [precio, setPrecio] = useState(product.precio);
  const [precioPuntos, setPrecioPuntos] = useState(product.precioPuntos);
  const [puntosRecompensa, setPuntosRecompensa] = useState(product.puntosRecompensa);
  const [descripcion, setDescripcion] = useState(product.descripcion);
  const [costo, setCosto] = useState(product.costo);

  const editProduct = async () => {
    //console.log(`id: ${product.id} Nombre: ${nombre}, Precio: ${precio}, PrecioPuntos: ${precioPuntos}, PuntosRecompensa: ${puntosRecompensa}, Descripcion: ${descripcion}, Costo: ${costo}`);
    if (nombre === '' || descripcion === '') {
      setMessage({ visible: true, type: "error", message: "El nombre y la descripción son necesarios para diferenciar el prdocuto" }); //alert("Seleccione una caja antes de asignar un cajero.")  
    } else {
      const productEdit = new Object() as Product;
      productEdit.id = product.id;
      productEdit.nombre = nombre;
      productEdit.precio = precio;
      productEdit.precioPuntos = precioPuntos;
      productEdit.puntosRecompensa = puntosRecompensa;
      productEdit.descripcion = descripcion;
      productEdit.costo = costo;
      productEdit.estado = true;
      await updateProductService(productEdit) == 200 ? setMessage({ visible: true, type: "success", message: "¡Producto editado!" }) : setMessage({ visible: true, type: "error", message: "Error al editar el producto" });
      await reloadData();
    }
  }
  return (
    <div style={{ display: "block", textAlign: "center", justifyContent: "center", alignItems: "center", margin: "5px", borderColor: "Highlight", borderRadius: "5%", backgroundColor: "ThreeDFace" }}>
      {/*{message.visible && (
        <div style={{ position: "absolute", top: "50", left: 0, right: 0, height: "150px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <ErrorMessageComponent
            message={message}
            setMessage={setMessage}
          />
        </div>
      )}*/}
      <div>
        <h3 style={{ color: "black" }}>Complete el formulario para editar el producto {product.id}</h3>
      </div>
      <div>
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
          style={{ margin: "10px", backgroundColor: "Highlight" }}
          defaultValue={product.nombre}
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          required />
      </div>
      <div>
        <TextField
          type="number"
          defaultValue={product.costo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const valor = parseInt(e.target.value);
            if (valor >= 0) {
              setCosto(valor);
            }
          }}
          style={{ margin: "10px", backgroundColor: "Highlight" }}
          id="outlined-basic"
          label="Costo"
          variant="outlined"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div>
        <TextField
          type="number"
          defaultValue={product.precio}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const valor = parseInt(e.target.value);
            if (valor >= 0) {
              setPrecio(valor);
            }
          }}
          style={{ margin: "10px", backgroundColor: "Highlight" }}
          id="outlined-basic"
          label="Precio de venta"
          variant="outlined"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div>
        <TextField
          type="number"
          defaultValue={product.precioPuntos}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const valor = parseInt(e.target.value);
            if (valor >= 0) {
              setPrecioPuntos(valor);
            }
          }}
          style={{ margin: "10px", backgroundColor: "Highlight" }}
          id="outlined-basic"
          label="Costo en puntos"
          variant="outlined"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div>
        <TextField
          type="number"
          defaultValue={product.puntosRecompensa}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const valor = parseInt(e.target.value);
            if (valor >= 0) {
              setPuntosRecompensa(valor);
            }
          }}
          style={{ margin: "10px", backgroundColor: "Highlight" }}
          id="outlined-basic"
          label="Puntos de recompensa"
          variant="outlined"
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div>
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescripcion(e.target.value)}
          style={{ margin: "10px", backgroundColor: "Highlight" }}
          defaultValue={product.descripcion}
          id="outlined-basic"
          label="Descripcion"
          variant="outlined" />
      </div>
      <div>
        <Button
          onClick={() => { editProduct(); handleCloseEditForm() }}
          style={{ margin: "10px" }}
          color="success"
          variant="contained"> Editar
        </Button>
        <Button
          onClick={() => handleCloseEditForm()}
          style={{ margin: "10px" }}
          color='secondary'
          variant="contained"> Cerrar
        </Button>


      </div>

    </div>
  )
}

export default FormToEditProduct