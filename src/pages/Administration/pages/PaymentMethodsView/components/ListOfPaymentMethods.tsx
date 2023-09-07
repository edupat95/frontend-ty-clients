import React, { FC } from 'react';
import { PaymentMethod } from '../../../../../models/PaymentMethod.model';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

interface Props {
  listOfPaymentMethods: PaymentMethod[];
}

const ListOfPaymentMethods: FC<Props> = ({
  listOfPaymentMethods
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Nombre</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfPaymentMethods.map((paymentMethod) => (
            <TableRow key={paymentMethod.id}>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{paymentMethod.name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteOutlined />}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListOfPaymentMethods;
