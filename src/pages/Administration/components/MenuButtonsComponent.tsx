import { Box, Button } from '@mui/material';
import React, { FC } from 'react'
import '../styles/MenuButtons.css';
interface Props {
  setStatisticsVewState: (value: boolean) => void;
  setProductsViewState: (value: boolean) => void;
  setBoxesViewState: (value: boolean) => void;
  setBoxesCashiersViewState: (value: boolean) => void;
  setBoxesControlViewState: (value: boolean) => void;
  setPaymentMethodsViewState: (value: boolean) => void;
}

const MenuButtonsComponent: FC<Props> = ({
  setStatisticsVewState,
  setProductsViewState,
  setBoxesViewState,
  setBoxesCashiersViewState,
  setBoxesControlViewState,
  setPaymentMethodsViewState
}) => {

  const clearViews = async () => {
    //await setStatisticsVewState(false);
    await setProductsViewState(false);
    await setBoxesViewState(false);
    await setBoxesCashiersViewState(false);
    await setBoxesControlViewState(false);
    await setPaymentMethodsViewState(false);
  }

  return (
    <div className='menuProductsComponent'>
      <Box sx={{ '& button': { ml: 5 } }}>
        {/* <Button variant="contained" onClick={async () => { await clearViews(); await setStatisticsVewState(true); console.log() }}>Mostrar estadísticas</Button> */}
        <Button variant="contained" onClick={async () => { await clearViews(); await setProductsViewState(true) }}>Adminitrar productos</Button>
        <Button variant="contained" onClick={async () => { await clearViews(); await setBoxesViewState(true) }}>Agregar/Quitar productos en cajas </Button>
        <Button variant="contained" onClick={async () => { await clearViews(); await setBoxesCashiersViewState(true) }}>Asignar cajeros a las cajas</Button>
        <Button variant="contained" onClick={async () => { await clearViews(); await setBoxesControlViewState(true) }}>Control de cajas</Button>
        <Button variant="contained" onClick={async () => { await clearViews(); await setPaymentMethodsViewState(true) }}>Métodos de pago</Button>
      </Box>
    </div>
  )
}



export default MenuButtonsComponent