import React, { FC, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { AddShoppingCartOutlined, ShoppingCartCheckoutOutlined, TableBar, TableRestaurant, Visibility } from '@mui/icons-material';
import { Table as T } from '../../../../../models/Cashier/table.model';

interface Props {
  tables: T[];
  setSelectedTable: (table: T) => void;
}

const TablesInRestoComponent: FC<Props> = ({ tables, setSelectedTable }) => {
  const [filter, setFilter] = useState('');

  // Filtrar mesas por número de mesa
  const filteredTables = tables.filter(table => {
    return table.number.toString().startsWith(filter);
  });

  return (
    <div>
      {/* Filtro */}
      <div style={{ display: "inline-block", marginRight: "16px" }}>
        <Typography variant="subtitle1"><strong>N° DE MESA:</strong></Typography>
      </div>
      <TextField
        label="Filtrar por número de mesa"
        variant="outlined"
        value={filter}
        onChange={event => setFilter(event.target.value)}
        style={{ backgroundColor: "white", color: "black" }}
        size="small"
      />

      {/* Tabla */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTables.map(table => (
              <TableRow key={table.number}>
                <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px", textAlign: 'center' }}>MESA N° {table.number}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <Button
                    startIcon={<TableRestaurant />}
                    endIcon={<TableBar />}
                    variant='contained'
                    onClick={() => setSelectedTable(table)}
                  >
                    Seleccionar mesa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TablesInRestoComponent;
