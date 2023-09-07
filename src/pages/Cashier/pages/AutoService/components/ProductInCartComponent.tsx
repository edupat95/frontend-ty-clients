import React, { FC } from 'react';
import { ProductInCart } from '../../../../../models/Cashier/productInCart.model';
import "../../../styles/ProductInMenu.css";
import { Product } from '../../../../../models/Cashier/product.model';
import { Box, Button, Grid } from '@mui/material';
import { AddBoxTwoTone, AddCircleOutline, Delete, Label, PlusOneOutlined, RemoveCircleOutline } from '@mui/icons-material';

interface Props {
  productInCart: ProductInCart;
  addOneToCart: (product: Product) => void;
  removeOneFromCart: (product: Product) => void;
  removeAllFromCart: (product: Product) => void;
}

const ProductInCartComponent: FC<Props> = ({ productInCart, addOneToCart, removeOneFromCart, removeAllFromCart }) => {
  return (
    <Grid container spacing={2} alignItems="center" sx={{ borderBottom: "thin solid gray", paddingLeft: "10%" }}>
      <Grid item xs={6} sm={3} md={2}>
        <strong style={{ backgroundColor: "green"}} > {productInCart.product.nombre} </strong>
      </Grid>
      <Grid item xs={6} sm={3} md={2}>
        { productInCart.product.descripcion }
      </Grid>
      <Grid item xs={6} sm={3} md={2}>
        {"Precio: $" + productInCart.product.precio * productInCart.quantity}
      </Grid>
      <Grid item xs={6} sm={3} md={2}>
        {"(Precio Pts:" + productInCart.product.precioPuntos * productInCart.quantity + ")"}
      </Grid>
      <Grid item xs={6} sm={3} md={2}>
        {"Recompensa: " + productInCart.product.puntosRecompensa * productInCart.quantity + "pts"}
      </Grid>
      <Grid item xs={6} sm={3} md={2}>
        <Box component="span" sx={{ '& button': { m: 0.5 } }} >
          <Button startIcon={<AddCircleOutline/>} style={{ padding: "1px" }} variant='contained' onClick={() => { addOneToCart(productInCart.product) }}> X{productInCart.quantity} </Button>
          <Button style={{ padding: "1px" }} variant='contained' onClick={() => { removeOneFromCart(productInCart.product) }}> <RemoveCircleOutline /> </Button>
          <Button style={{ padding: "1px" }} variant='contained' onClick={() => { removeAllFromCart(productInCart.product) }}> <Delete /> </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ProductInCartComponent;
