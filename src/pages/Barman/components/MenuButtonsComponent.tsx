import { Box } from '@mui/material';
import React, { FC } from 'react';
import '../styles/MenuButtonStyles.css';
interface Props {
    setSerchTicktView: (value: boolean) => void;
    setCustomerProductsView: (value: boolean) => void;
}

const MenuButtonsComponent: FC<Props> = ({
    setSerchTicktView,
    setCustomerProductsView
}) => {
  const handleMenuClick = async (viewSetter: (value: boolean) => void) => {
    // Limpiar otras vistas
    await setSerchTicktView(false);
    await setCustomerProductsView(false);

    // Establecer la vista deseada
    await viewSetter(true);
  };
  //              
  //

  return (
    <div className='menuProductsComponent'>
      <ul className='menu-bar'>
          <li onClick={() => handleMenuClick(setSerchTicktView)}>Buscar ticket</li>
          <li onClick={() => handleMenuClick(setCustomerProductsView)}>Buscar tickets con cliente</li>
        </ul>
    </div>
  );
};

export default MenuButtonsComponent;
