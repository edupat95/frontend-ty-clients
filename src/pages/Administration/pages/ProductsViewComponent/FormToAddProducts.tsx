import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useState, useEffect, FC } from 'react'
import { Product } from '../../../../models/Cashier/product.model';
import { setProduct } from '../../services/products.services';
import ErrorMessageComponent from '../../../../components/ErrorMessageComponent';

interface Props {
  reloadData: () => void;
}

const FormToAddProducts: FC<Props> = (
  {
    reloadData
  }
) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [precioPuntos, setPrecioPuntos] = useState(0);
  const [puntosRecompensa, setPuntosRecompensa] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [message, setMessage] = useState<{ visible: boolean, type: string, message: string }>({ visible: false, type: "", message: "" });
  const [costo, setCosto] = useState(0);

  const createProduct = async () => {
    //console.log(nombre, precio, precioPuntos, puntosRecompensa, descripcion);
    if (nombre === '' || descripcion === '') {
      setMessage({ visible: true, type: "error", message: "El nombre y la descripción son necesarios para diferenciar el prdocuto" }); //alert("Seleccione una caja antes de asignar un cajero.")  
    } else {
      const product = new Object() as Product;
      product.nombre = nombre;
      product.precio = precio;
      product.precioPuntos = precioPuntos;
      product.puntosRecompensa = puntosRecompensa;
      product.descripcion = descripcion;
      product.costo = costo;
      product.estado = true;
      await setProduct(product) == 201 ? setMessage({ visible: true, type: "succes", message: "¡Producto editado!" }) : setMessage({ visible: true, type: "error", message: "Error al editar el producto" });
      reloadData();
    }

  }
  return (
    <div style={{ margin: "5px", borderColor: "Highlight", borderRadius: "5%", backgroundColor: "ThreeDFace", display: "block" }}>
      {message.visible && (
        <div style={{ position: "absolute", top: "50", left: 0, right: 0, height: "150px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <ErrorMessageComponent
            message={message}
            setMessage={setMessage}
          />
        </div>
      )}
      <div>
        <h3 style={{ color: "black" }}>Complete el formulario para agregar un producto</h3>
      </div>
      <div>
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
          style={{ margin: "10px", backgroundColor: "Highlight" }}
          value={nombre}
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          required />
      </div>
      <div>
        <TextField
          type="number"
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
          value={descripcion}
          id="outlined-basic"
          label="Descripcion"
          variant="outlined" />
      </div>
      <div>
        <Button
          onClick={() => createProduct()}
          style={{ margin: "10px" }}
          variant="contained"> Crear producto </Button>
      </div>
    </div>
  )
}

export default FormToAddProducts