import { SignLanguageOutlined } from '@mui/icons-material';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react'
import { Cashier } from '../../../../../models/Cashier/cashier.model'

interface Props {
  cashiers: Cashier[];
}

const ListOfCashiersInBoxComponent: FC<Props> = ({ cashiers }) => {
  return (
    <TableContainer component="div" style={{backgroundColor: "GrayText", fontSize: "16px", borderRadius: "3%", height: "650px", overflowY: "scroll"}}>
      <Table >
        <TableHead>
          <TableRow >
            <TableCell style={{color: "white", fontSize: "18px", fontWeight: "bold"}} >Descripcion</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", fontWeight: "bold"}} >Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cashiers.map((cashier) => (
            <TableRow key={cashier.id}>
              <TableCell style={{color: "white", padding: "15px", fontSize: "18px" }}>{cashier.worker.descripcion} </TableCell>
              <TableCell style={{color: "white", padding: "15px", fontSize: "18px" }}>
                <Button
                  variant="contained"
                  endIcon={<SignLanguageOutlined/>}
                  onClick={async () => {
                    console.log("intentando quitar al cajero")
                  }}
                >
                  Quitar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>     
  )
}

export default ListOfCashiersInBoxComponent;