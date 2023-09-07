import React, { FC } from 'react';
import "../../../styles/ProductInMenu.css";
import { Product } from '../../../../../models/Cashier/product.model';
import { Box, Button, Grid } from '@mui/material';
import { AddBoxTwoTone, AddCircleOutline, Delete, Label, PlusOneOutlined, RemoveCircleOutline } from '@mui/icons-material';
import { ProductInTable } from '../../../../../models/Cashier/productInTable.model';

interface Props {
  productsInTable: ProductInTable[];
  addOneToTable: (product: Product) => void;
  removeOneFromTable: (product: Product) => void;
}

const ProductsInTableComponent: FC<Props> = ({
  productsInTable,
  addOneToTable,
  removeOneFromTable
}) => {
  const total = productsInTable.reduce((acc, cur) => {
    return {
      totalCost: acc.totalCost + cur.totalCost,
      totalCostPoints: acc.totalCostPoints + cur.totalCostPoints,
      puntosRecompensa: acc.puntosRecompensa + cur.product.puntosRecompensa * cur.quantity
    }
  }, {
    totalCost: 0,
    totalCostPoints: 0,
    puntosRecompensa: 0
  })
  return (
    <>
      {productsInTable.map((productInTable) => (
        <Grid key={productInTable.id} container spacing={2} alignItems="center" sx={{ borderBottom: "thin solid gray", padding: "2%" }}>
          <Grid item xs={6} sm={3} md={2}>
            <strong style={{ backgroundColor: "green" }} > {productInTable.product.nombre} </strong>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            {productInTable.product.descripcion}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            {"Precio: $" + productInTable.totalCost}
          </Grid><Grid item xs={6} sm={3} md={2}>
            {"Precio puntos: " + productInTable.totalCostPoints}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            {"Recompensa: " + productInTable.product.puntosRecompensa * productInTable.quantity + "pts"}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Box component="span" sx={{ '& button': { display: 'block', margin: "1%" } }} >
              <Button style={{ padding: "1px" }} variant='contained' onClick={() => { addOneToTable(productInTable.product) }}>+ X{productInTable.quantity} </Button>
              <Button style={{ padding: "1px" }} variant='contained' onClick={() => { removeOneFromTable(productInTable.product) }}> <RemoveCircleOutline /> </Button>
            </Box>
          </Grid>
        </Grid>
      ))}
      { productsInTable.length > 0 && (
      <Grid container spacing={2} alignItems="center" sx={{ borderBottom: "thin solid gray", padding: "2%" }}>
          <Grid item xs={6} sm={3} md={2}>
            -
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            -
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            Total $: {total.totalCost}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            Precio total puntos: {total.totalCostPoints}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            Total recompensa: {total.puntosRecompensa}
          </Grid>
        </Grid>
      )}
    </>
  )

}

export default ProductsInTableComponent;


