import React, { FC, useState } from 'react';
import { Product } from '../../../../../models/Cashier/product.model';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { PlusOne, Tapas } from '@mui/icons-material';

interface Props {
  products: Product[];
  addOneToTable: (product: Product) => void;
}

const ProductInMenuComponent: FC<Props> = ({ products, addOneToTable }) => {
  const [filter, setFilter] = useState("");

  const filteredProducts = products.filter(product => {
    const idMatch = product.id.toString().toLowerCase().includes(filter.toLowerCase());
    const nameMatch = product.nombre.toLowerCase().includes(filter.toLowerCase());
    return idMatch || nameMatch;
  });

  return (
    <TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <TextField
          style={{backgroundColor: "white", color: "black"}}
          label='Buscar por id o nomrbe'
          variant='outlined'
          size='small'
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>ID</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Nombre</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Descripción</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Precio</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Precio en puntos</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Recomponesa</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{product.id}</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{product.nombre}</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{product.descripcion}</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{product.precio}</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{product.precioPuntos}</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{product.puntosRecompensa}</TableCell>
              <TableCell>
                <Button
                  startIcon={<Tapas/>}
                  endIcon={<PlusOne />}
                  variant='contained'
                  onClick={() => addOneToTable(product)}
                >
                  Agregar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductInMenuComponent;
