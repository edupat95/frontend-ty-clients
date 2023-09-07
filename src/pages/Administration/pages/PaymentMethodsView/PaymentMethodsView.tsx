import { width } from '@mui/system'
import React, { useEffect } from 'react'
import { PaymentMethod } from '../../../../models/PaymentMethod.model'
import { getPaymentMethods, setPaymentMethod } from '../../services/paymentMethod.services'
import FormToAddPaymentMethod from './components/FormToAddPaymentMethod'
import ListOfPaymentMethods from './components/ListOfPaymentMethods'

const PaymentMethodsView = () => {
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([]);

  useEffect(() => { 
    getPaymentMethods().then((res) => {
      setPaymentMethods(res);
    });
  }, [])

  const addPaymentMethod = async (paymentMethod: String) => {
    const newPaymentMethod = await setPaymentMethod(paymentMethod);
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    //console.log("Agregando metodo de pago: ", paymentMethod);
  } 

  return (
    <div style={{display: "flex"}}> 
      <div style={{width: "50%", margin: "5%"}}>
        <FormToAddPaymentMethod 
          addPaymentMethod={addPaymentMethod}
        />
      </div>
      <div style={{borderRadius: "2%",height: "650px", overflowY: "scroll", textAlign: "center", alignItems: "center", backgroundColor: "GrayText" ,margin: "3%", width: "70%"}}>
        <ListOfPaymentMethods 
          listOfPaymentMethods={paymentMethods}
        />
      </div>
    </div>
  )
}

export default PaymentMethodsView