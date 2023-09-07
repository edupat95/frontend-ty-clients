import { Box, Button } from '@mui/material';
import React, {useState} from 'react'
import CabeceraComponent from '../../components/CabeceraComponent'
import BoxesCashiersViewComponent from './pages/BoxesCashiersViewComponent/BoxesCashiersViewComponent';
import BoxesCachiersViewComponent from './pages/BoxesCashiersViewComponent/BoxesCashiersViewComponent';
import MenuButtonsComponent from './components/MenuButtonsComponent';

import './styles/Administration.css';
import ProductsViewComponent from './pages/ProductsViewComponent/ProductsViewComponent';
import StatisticsProdcts from './pages/StatiticsProducts/StatisticsProdcts';
import Top10Consumers from './pages/StatiticsProducts/Top10Consumers';
import TopProducts from './pages/StatiticsProducts/TopProducts';
import BoxesViewComponent from './pages/BoxesViewComponents/BoxesViewComponent';
import BoxesControlView from './pages/BoxesControlView/BoxesControlView';
import PaymentMethodsView from './pages/PaymentMethodsView/PaymentMethodsView';

//display: "inline-block"; padding: "5px"; background-color: "red";
export default function Administration() {
  const [statisticsViewState, setStatisticsVewState] = useState(false);
  const [productsViewState, setProductsViewState] = useState(false);
  const [boxesViewState, setBoxesViewState] = useState(false);
  const [boxesCashiersViewState, setBoxesCashiersViewState] = useState(false);
  const [boxesControlViewState, setBoxesControlViewState] = useState(false);
  const [paymentMethodsViewState, setPaymentMethodsViewState] = useState(false);
  return (
    <div>
      <CabeceraComponent />
      <MenuButtonsComponent
        setStatisticsVewState = {setStatisticsVewState}
        setProductsViewState = {setProductsViewState}
        setBoxesViewState = {setBoxesViewState}
        setBoxesCashiersViewState = {setBoxesCashiersViewState}
        setBoxesControlViewState = {setBoxesControlViewState}
        setPaymentMethodsViewState = {setPaymentMethodsViewState}
      />
      <div>
      {productsViewState && (
          <ProductsViewComponent />
      )}
      {statisticsViewState && (
          <div style={{margin: "2%"}}>
            <StatisticsProdcts/>
            <Top10Consumers/>
            <TopProducts/>
          </div>
      )}
      {boxesViewState && (
          <BoxesViewComponent/>
      )}
      {boxesCashiersViewState && (
        <BoxesCashiersViewComponent/>
      )} 
      {boxesControlViewState && (
        <BoxesControlView />
      )}
      {paymentMethodsViewState && (
        <PaymentMethodsView/>
      )}
      </div>
    </div>
  )
}
