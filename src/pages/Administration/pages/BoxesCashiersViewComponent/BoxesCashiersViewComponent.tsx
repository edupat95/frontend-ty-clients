import { Alert, AlertTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ErrorMessageComponent from '../../../../components/ErrorMessageComponent';
import { Box } from '../../../../models/Cashier/box.model';
import { Cashier } from '../../../../models/Cashier/cashier.model';
import { getBoxesInClub } from '../../services/boxes.services';
import { getCashiersByClub, getCashiersInBox, setBoxInCashier } from '../../services/boxesCashier.services';
import ListOfCashiersComponent from './components/ListOfCashiersComponent'
import ListOfCashiersInBoxComponent from './components/ListOfCashiersInBoxComponent';

function BoxesCashiersViewComponent() {

  const [cashiers, setCashiers] = useState<Cashier[]>([]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [selectedBox, setSelectedBox] = useState<Box | undefined>(undefined);
  const [selectedCashier, setSelectedCashier] = useState<Cashier | undefined>(undefined);
  const [cashiersInBox, setCashiersInBox] = useState<Cashier[]>([]);
  const [message, setMessage] = useState<{ visible: boolean, type: string, message: string }>({ visible: false, type:"", message: "" });

  useEffect(() => {
    getBoxesInClub().then((data) => {
      setBoxes(data);
    }).catch(e => {
      alert("Ocurrio un error al intentar obtener las cajas del club.");
    });
    getCashiersByClub().then((data) => {
      setCashiers(data);
    }).catch(e => {
      alert("Ocurrio un error al intentar obtener los cajeros del club.");
    });
  }, [])


  const linkCashierToBox = async (cashier: Cashier) => {
    if (selectedBox) {
      if (cashier != undefined) {
        //console.log(`Vincular cajero ${cashier.id} al cajero ${selectedBox.id} `);
        setBoxInCashier(cashier, selectedBox).then((data) => {
          if (data) {
            alert("Cajero asignado correctamente.");
            getCashiersInBox(selectedBox).then((data) => {
              setCashiersInBox(data);
            }).catch(e => {
              alert("Ocurrio un error al intentar obtener los cajeros de la caja.");
            });
          }
        }).catch(e => {
          alert("Ocurrio un error al intentar obtener.");
        });
      } else {
        alert("ERROR AL INTENTAR ASIGNAR EL CAJERO: Reporte este error al adminitrador de sistemas.")
      }
    } else {
      setMessage({ visible: true,type:"error", message: "Seleccione una caja antes de asignar un cajero." }); //alert("Seleccione una caja antes de asignar un cajero.")
    }
  }

  const handleSelectedBox = async (box: Box | undefined) => {
    if (box) {
      await setSelectedBox(box);
      await getCashiersInBox(box).then((data) => {
        setCashiersInBox(data);
      }).catch(e => {
        alert("Ocurrio un error al intentar obtener los cajeros de la caja.");
      });
    } else {
      setSelectedBox(undefined);
      setCashiersInBox([]);
    }
  }



  return (
    <div style={{ width: "100%", display: "flex" }}>
      {message.visible && (
        <div style={{ position: "absolute", top: "50", left: 0, right: 0, height: "150px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <ErrorMessageComponent
            message={message}
            setMessage={setMessage}
          />
        </div>


      )}
      <div style={{ paddingTop: "2.5%", margin: "2%", width: "50%", marginTop: "5%" }}>
        <ListOfCashiersComponent
          cashiers={cashiers}
          setSelectedCashier={setSelectedCashier}
          linkCashierToBox={linkCashierToBox}
        />
      </div>
      <div style={{ width: "50%" }}>
        <div style={{ margin: "3%", paddingTop: "3%", width: "25%", textAlign: "center", paddingLeft: "33%" }}>
          <FormControl fullWidth style={{ backgroundColor: "GrayText" }}>
            <InputLabel style={{ color: "white" }} id="cashier-label">Seleccione una caja</InputLabel>
            <Select
              style={{ color: "white" }}
              labelId="cashier-label"
              id="cashier-select"
              value={selectedBox?.id ? selectedBox.id : ""}
              label="Seleccione una caja"
              onChange={async (e: SelectChangeEvent<number>) => {
                const selectedBoxId = e.target.value;
                const box = boxes.find((box) => box.id === selectedBoxId);
                await handleSelectedBox(box);
              }}
            >
              {boxes.map((box) => (
                <MenuItem key={box.id} value={box.id}>
                  {box.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ margin: "3%" }}>
          <ListOfCashiersInBoxComponent
            cashiers={cashiersInBox}
          />
        </div>
      </div>
    </div>
  )
}

export default BoxesCashiersViewComponent;