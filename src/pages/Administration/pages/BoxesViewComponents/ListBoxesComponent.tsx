import React, { FC, useState } from 'react';
import { Box } from '../../../../models/Cashier/box.model';
import { InputLabel, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface Props {
  boxes: Box[];
  setSelectedBox: (box: Box | undefined) => void;
  selectedBox: Box | undefined;  
}

const ListBoxesComponent: FC<Props> = ({ boxes, setSelectedBox, selectedBox }) => {
  
  const handleBoxChange = (event: SelectChangeEvent<number>) => {
    const selectedBoxId = event.target.value;
    const box = boxes.find((box) => box.id === selectedBoxId);
    setSelectedBox(box);  

  };

  return (
    <div>
      <InputLabel style={{color: "white"}} id="demo-simple-select-label"> Seleccione una caja </InputLabel>
      <Select
      labelId="demo-simple-select-label" 
      id="demo-simple-select" 
      label="Seleccione una caja"
      style={{ width: "50%", color: "white" ,backgroundColor: "GrayText" }} 
      value={selectedBox?.id || ''} 
      onChange={handleBoxChange}>
        {boxes.map((box) => (
          <MenuItem key={box.id} value={box.id}>
            {box.nombre}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ListBoxesComponent;