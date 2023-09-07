import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Product } from '../../../../models/Cashier/product.model';
import { getProductsInClub } from '../../services/products.services';
import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';
import { disableProduct } from '../../services/products.services'
import FormToEditProduct from './FormToEditProduct';
import ErrorMessageComponent from '../../../../components/ErrorMessageComponent';

interface Props {
  productsInClub: Product[];
  reloadData: () => void;
}

const ListOfProductsInClub: FC<Props> = ({ productsInClub, reloadData }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [open, setOpen] = React.useState(false);
  const [auxProduct, setAuxProduct] = useState<Product>(new Object() as Product);
  const [message, setMessage] = useState<{ visible: boolean, type: string, message: string }>({ visible: false, type: "", message: "" });
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOpenEditForm = async (product: Product) => {
    setAuxProduct(product);
    setOpen(true)
  };
  const handleCloseEditForm = () => setOpen(false);

  useEffect(() => {
    setFilteredProducts(productsInClub);
  }, [productsInClub]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = productsInClub.filter((product: Product) => product.nombre.toLowerCase().includes(keyword) || product.id.toString().includes(keyword));
    setFilteredProducts(filtered);
  };

  return (
    <div style={{ margin: '5px' }}>
      {message.visible && (
        <div style={{ position: "absolute", top: "50", left: 0, right: 0, height: "150px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <ErrorMessageComponent
            message={message}
            setMessage={setMessage}
          />
        </div>
      )}
      <div>
        <input type="text" placeholder="Filtrar por nombre o id..." onChange={handleFilter} />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Id</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Nombre</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Descripción</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Precio</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Precio en puntos</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Recompensa en puntos</TableCell>
              <TableCell style={{ padding: '15px', color: 'white', fontWeight: 'bolder', fontSize: "18px" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell style={{ padding: '15px', color: 'white', fontSize: "18px" }}>{product.id}</TableCell>
                <TableCell style={{ padding: '15px', color: 'white', fontSize: "18px" }}>{product.nombre}</TableCell>
                <TableCell style={{ padding: '15px', color: 'white', fontSize: "18px" }}>{product.descripcion}</TableCell>
                <TableCell style={{ padding: '15px', color: 'white', fontSize: "18px" }}>{product.precio}</TableCell>
                <TableCell style={{ padding: '15px', color: 'white', fontSize: "18px" }}>{product.precioPuntos}</TableCell>
                <TableCell style={{ padding: '15px', color: 'white', fontSize: "18px" }}>{product.puntosRecompensa}</TableCell>
                <TableCell style={{ padding: '15px', color: 'white', fontSize: "18px" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenEditForm(product)}>
                    Editar
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleCloseEditForm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.09)" } }}

                  >
                    <Box sx={style}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormToEditProduct
                          product={auxProduct}
                          reloadData={reloadData}
                          handleCloseEditForm={handleCloseEditForm}
                          setMessage={ setMessage }
                        />
                      </div>
                    </Box>
                  </Modal>
                  <Button
                    style={{ marginTop: '10px' }}
                    color="error"
                    variant="contained"
                    onClick={async () => {
                      await disableProduct(product);
                      reloadData();
                    }}>
                    Eliminar
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

export default ListOfProductsInClub;
