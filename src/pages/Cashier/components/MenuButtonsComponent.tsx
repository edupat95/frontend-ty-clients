import { Box } from '@mui/material';
import React, { FC } from 'react';
import '../styles/MenuButtonStyles.css';
interface Props {
  setGenerateIdentifierAssociationVewState: (value: boolean) => void;
  setLinkIdentifierToDocumentoViewState: (value: boolean) => void;
}

const MenuButtonsComponent: FC<Props> = ({
  setGenerateIdentifierAssociationVewState,
  setLinkIdentifierToDocumentoViewState
}) => {
  const handleMenuClick = async (viewSetter: (value: boolean) => void) => {
    // Limpiar otras vistas
    await setGenerateIdentifierAssociationVewState(false);
    await setLinkIdentifierToDocumentoViewState(false);

    // Establecer la vista deseada
    await viewSetter(true);
  };

  return (
    <div className='menuProductsComponent'>
      <ul className='menu-bar'>
          <li onClick={() => handleMenuClick(setGenerateIdentifierAssociationVewState)}>Asociar cliente generando QR identificador</li>
          <li onClick={() => handleMenuClick(setLinkIdentifierToDocumentoViewState)}>Asociar cliente vinculando tarjeta</li>
        </ul>
    </div>
  );
};

export default MenuButtonsComponent;
