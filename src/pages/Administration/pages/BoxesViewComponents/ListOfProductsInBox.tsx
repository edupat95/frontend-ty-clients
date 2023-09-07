import React, { FC, useState } from 'react';
import { Box } from '../../../../models/Cashier/box.model';
import { Product } from '../../../../models/Cashier/product.model';
import { getProductsInBox } from '../../services/boxes.services';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Input
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

interface Props {
  products: Product[];
  removeProduct: (product: Product) => void;
}

const ListOfProductsInBox: FC<Props> = ({
  products,
  removeProduct
}) => {
  const [searchText, setSearchText] = useState<string>('');

  const filteredProducts = products.filter((product) => {
    const byId = product.id.toString().includes(searchText);
    const byName = product.nombre.toLowerCase().includes(searchText.toLowerCase());
    return byId || byName;
  });

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <div>
        <Input style={{backgroundColor: "white"}} id="searchText" placeholder="Filtrar por nombre o id..." type="text" value={searchText} onChange={handleSearchTextChange} />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>ID</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Nombre</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Descripción</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Precio</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Precio</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Precio en puntos</TableCell>
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
                <TableCell style={{ padding: '15px', color: 'white', fontSize: "18px" }}>{product.precioPuntos}</TableCell>
                <TableCell style={{ padding: '15px', color: 'white', fontSize: "18px" }}>{product.puntosRecompensa}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    endIcon={<DeleteOutlined />}
                    onClick={() => removeProduct(product)}
                  >
                    Quitar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListOfProductsInBox;
