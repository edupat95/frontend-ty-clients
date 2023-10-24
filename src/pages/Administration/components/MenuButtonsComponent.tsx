import React, { FC } from 'react';
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
  const handleMenuClick = (viewSetter: (value: boolean) => void) => {
    // Limpiar otras vistas
    setStatisticsVewState(false);
    setProductsViewState(false);
    setBoxesViewState(false);
    setBoxesCashiersViewState(false);
    setBoxesControlViewState(false);
    setPaymentMethodsViewState(false);

    // Establecer la vista deseada
    viewSetter(true);
  };

  return (
    <div className='menuProductsComponent'>
      <ul className='menu-bar'>
        <li onClick={() => handleMenuClick(setStatisticsVewState)}>Mostrar estadísticas</li>
        <li onClick={() => handleMenuClick(setProductsViewState)}>Administrar productos</li>
        <li onClick={() => handleMenuClick(setBoxesViewState)}>Agregar/Quitar productos en cajas</li>
        <li onClick={() => handleMenuClick(setBoxesCashiersViewState)}>Asignar cajeros a las cajas</li>
        <li onClick={() => handleMenuClick(setBoxesControlViewState)}>Control de cajas</li>
        <li onClick={() => handleMenuClick(setPaymentMethodsViewState)}>Métodos de pago</li>
      </ul>
    </div>
  );
};

export default MenuButtonsComponent;

