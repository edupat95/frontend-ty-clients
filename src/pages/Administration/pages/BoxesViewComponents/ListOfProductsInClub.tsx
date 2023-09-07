import React, { useEffect, useState, FC } from 'react'
import { Product } from '../../../../models/Cashier/product.model';
import { getProductsInClub } from '../../services/products.services';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';

interface Props {
  loadProduct: (product: Product) => void;
}

const ListOfProductsInClub: FC<Props> = ({
  loadProduct
}) => {
  const [productsInClub, setProductsInClub] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    getProductsInClub().then((data) => {
      setProductsInClub(data);
    }).catch(e => {
      alert("Ocurrio un error");
      console.error("Error al intentar buscar los productos del club. Type error -> " + e.response.status);
    });

  }, []);

  const filteredProducts = productsInClub.filter(product =>
    product.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    product.descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
    product.id.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ margin: "5px" }}>
      <TextField
        label="Filtrar por id o nombre..."
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ backgroundColor: "white", marginBottom: "10px" }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>ID</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Nombre</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Descripción</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Precio</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Precio en puntos</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Recompensa en puntos</TableCell>
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
                <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>
                  <Button
                    variant="contained"
                    endIcon={<SendOutlined />}
                    onClick={() => loadProduct(product)}
                  >
                    Cargar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ListOfProductsInClub;
