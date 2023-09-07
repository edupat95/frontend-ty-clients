import { Button, TextField } from '@mui/material'
import { display } from '@mui/system'
import React, { useState, ChangeEvent, FC } from 'react'
import { PaymentMethod } from '../../../../../models/PaymentMethod.model'


interface Props {
  addPaymentMethod: (paymentMethod: String) => void
}

const FormToAddPaymentMethod: FC<Props> = ({
  addPaymentMethod
}) => {
  const [nombre, setNombre] = useState('');

  return (
    <div >
      <h4>Agregar forma de pago</h4>
      <div>
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
          style={{ margin: "10px", backgroundColor: "GrayText", color: "white" }}
          value={nombre}
          id="outlined-basic"
          label="Forma de pago:"
          variant="outlined"
          inputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
          required />
      </div>
      <div>
        <Button
          onClick={() => addPaymentMethod(nombre)}
          style={{ margin: "10px" }}
          variant="contained"> Agregar </Button>
      </div>
    </div>
  )
}

export default FormToAddPaymentMethod