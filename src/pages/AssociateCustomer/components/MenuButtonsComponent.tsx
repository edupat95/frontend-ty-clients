import { Box, Button } from '@mui/material';
import React, { FC } from 'react'

interface Props {
  setGenerateIdentifierAssociationVewState: (value: boolean) => void;
  setLinkIdentifierToDocumentoViewState: (value: boolean) => void;
}

const MenuButtonsComponent: FC<Props> = ({
  setGenerateIdentifierAssociationVewState,
  setLinkIdentifierToDocumentoViewState
}) => {

  const clearViews = async () => {
    //await setStatisticsVewState(false);
    await setGenerateIdentifierAssociationVewState(false);
    await setLinkIdentifierToDocumentoViewState(false);
  }

  return (
    <div className='menuProductsComponent'>
      <Box sx={{ '& button': { ml: 5 } }}>
        <Button variant="contained" onClick={async () => { await clearViews(); await setGenerateIdentifierAssociationVewState(true) }}>Asociar cliente generando QR identificador</Button>
        <Button variant="contained" onClick={async () => { await clearViews(); await setLinkIdentifierToDocumentoViewState(true) }}>Asociar cliente vinculando tarjeta</Button>
      </Box>
    </div>
  )
}



export default MenuButtonsComponent