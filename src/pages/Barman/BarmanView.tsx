
import { getSession } from '../../utilities/public.utilities';

import CabeceraComponent from '../../components/CabeceraComponent';
import SerchTicketView from './pages/SerchTicketView';
import { Button } from '@mui/material';
import { useState } from 'react';
import SerchCustomerProductsView from './pages/SerchCustomerProductsView';


const BarmanView = () => {

  const [serchTicktView, setSerchTicktView] = useState(true);
  const [customerProductsView, setCustomerProductsView] = useState(false);

  return (
    <>
      <CabeceraComponent />
      <div className='associateCustomerContainer'>
        <div className="dataDniContainer">

          <b>Club: </b> {getSession().club.nombre} <br />

          <div>
            <Button
              variant='contained'
              onClick={() => { setSerchTicktView(true); setCustomerProductsView(false) }}
            >
              buscar ticket
            </Button>
            <Button
              variant='contained'
              style={{ marginLeft: "10px" }}
              onClick={() => { setSerchTicktView(false); setCustomerProductsView(true) }}
            >
              buscar tickets con cliente
            </Button>
          </div>

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