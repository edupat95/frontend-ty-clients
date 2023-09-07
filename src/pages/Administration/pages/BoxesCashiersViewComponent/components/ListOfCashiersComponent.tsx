import { SendOutlined } from '@mui/icons-material'
import { Button, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { FC, useState } from 'react'
import { Box } from '../../../../../models/Cashier/box.model'
import { Cashier } from '../../../../../models/Cashier/cashier.model'
import { setBoxInCashier } from '../../../services/boxesCashier.services'

interface Props {
  cashiers: Cashier[],
  setSelectedCashier: (cashier: Cashier) => void
  linkCashierToBox: (cashier: Cashier) => void
}

const ListOfCashiersComponent: FC<Props> = ({
  cashiers,
  setSelectedCashier,
  linkCashierToBox
}) => {

  return (
    <TableContainer style={{ fontSize: "16px", width: "100%", backgroundColor: "GrayText", borderRadius: "3%", height: "650px", overflowY: "scroll" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: "15px", color: "white", fontSize: "18px", fontWeight: "bold" }} >Descripcion del cajero</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontSize: "18px", fontWeight: "bold" }}>Caja asignada</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontSize: "18px", fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cashiers.map((cashier) => (
            <TableRow key={cashier.id}>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{cashier.worker.descripcion} </TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{cashier.box?.nombre ? cashier.box.nombre : "Sin caja asignada"}</TableCell>
              <TableCell style={{ padding: "15px" }}>
                <Button
                  variant="contained"
                  endIcon={<SendOutlined />}
                  onClick={async () => {
                    await setSelectedCashier(cashier);
                    await linkCashierToBox(cashier);
                  }}
                >
                  Vincular
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ListOfCashiersComponent