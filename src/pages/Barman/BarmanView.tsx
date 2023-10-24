
import { getSession } from '../../utilities/public.utilities';

import CabeceraComponent from '../../components/CabeceraComponent';
import SerchTicketView from './pages/SerchTicketView';
import { Button } from '@mui/material';
import { useState } from 'react';
import SerchCustomerProductsView from './pages/SerchCustomerProductsView';
import MenuButtonsComponent from './components/MenuButtonsComponent';


const BarmanView = () => {

  const [serchTicktView, setSerchTicktView] = useState(true);
  const [customerProductsView, setCustomerProductsView] = useState(false);

  return (
    <>
      <CabeceraComponent />
      <div className='associateCustomerContainer'>
        <div className="dataDniContainer">

          <b>Club: </b> {getSession().club.nombre} <br />


          <MenuButtonsComponent
            setSerchTicktView={setSerchTicktView}
            setCustomerProductsView={setCustomerProductsView}
          />
          

          {serchTicktView && (
            <SerchTicketView />
          )}
          {customerProductsView && (
            <div>
              <SerchCustomerProductsView />
            </div>
          )}

        </div>
      </div>
    </>

  );
}

export default BarmanView