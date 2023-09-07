import React, { useState, useRef } from 'react';
import { Button, Input } from '@mui/material'
import { QRCodeCanvas } from 'qrcode.react'
import { Dni } from '../../../../models/AssociateCustomer/dni.model';
//import { MemberClub } from '../../models/Cashier/memberClub.model';
import { associateCustomer } from '../../services/associateCustomer.services';
import { MemberClub } from '../../../../models/Cashier/memberClub.model';
import "../../styles/AssociateCustomer.css";
import DataToIdentifierPrinterComponent from './components/DataToIdentifierPrinterComponent';
import ReactToPrint, {useReactToPrint} from 'react-to-print';


const GenerateIdentifierAssociationView = () => {
  const [newMember, setNewMember] = useState<MemberClub>({} as MemberClub);
  const [scann, setScann] = useState<Boolean>(false);
  const [dni, setDni] = useState<Dni | undefined>();
  const [auxText, setAuxText] = useState("");
  const componentRef = useRef<HTMLDivElement>(null); //para imprimir el ticket

  const obtenerDatos = (documento: string, delimitador: string) => {
    const datosDocumento = documento.split(delimitador);
    const nacimientoAux = datosDocumento[6].split("-");
    const fechaEmisionAux = datosDocumento[7].split("-");

    const nacimiento: Date = new Date();
    nacimiento.setFullYear(parseInt(nacimientoAux[2]));
    nacimiento.setMonth(parseInt(nacimientoAux[1]) - 1);
    nacimiento.setDate(parseInt(nacimientoAux[0]));

    const fechaEmisionC: Date = new Date();
    fechaEmisionC.setFullYear(parseInt(fechaEmisionAux[2]));
    fechaEmisionC.setMonth(parseInt(fechaEmisionAux[1]) - 1);
    fechaEmisionC.setDate(parseInt(fechaEmisionAux[0]));
    
    const dni: Dni = {
      id: 0,
      numeroTramite: parseInt(datosDocumento[0]),
      apellidos: datosDocumento[1],
      nombres: datosDocumento[2],
      sexo: datosDocumento[3],
      numeroDni: parseInt(datosDocumento[4]),
      ejemplar: datosDocumento[5],
      nacimiento: nacimiento,
      fechaEmision: fechaEmisionC,
      inicioFinCuil: parseInt(datosDocumento[8])
    }
    console.log(dni);
    setDni(dni);
    return datosDocumento;
  }

  const handleAssociateCustomer = async (dni: Dni) => {
    if (dni?.numeroDni == 0) {
      alert("No hay datos del cliente");
      return 0;
    } else {
      const res = await associateCustomer(dni);
      if (res != 0) {
        setNewMember(res);
        setScann(false);
      } else {
        alert("No se pudo asociar el cliente");
      }
    }
  }

  const handlePrint = useReactToPrint({ //para imprimir el ticket
    content: () => componentRef.current,
    onAfterPrint: () => {
      //QUITAMOS EL CLIENTE.
      setNewMember({} as MemberClub);
      setDni({} as Dni);
    }
    
  });

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) { // Verificar si se presionó "Enter"
      await obtenerDatos(auxText, '"');
      //console.log(`User typed: ${auxText}`);
      setAuxText("");
    } else if (event.key.match(/^[a-zA-Z0-9 \-"]$/)) {
      setAuxText((prevTypedText) => prevTypedText + event.key);
    }
    event.preventDefault();
  };

  return (
    <>
      <div className='associateCustomerContainer'>
        <div className="dataDniContainer">
          <b>Apellidos: </b> {dni?.apellidos ? dni?.apellidos : ""} <br />
          <b>Nombres: </b> {dni?.nombres ? dni?.nombres : ""} <br />
          <b>Nacimiento: </b> {dni?.nacimiento ? (dni?.nacimiento.getDate() + "/" + (dni?.nacimiento.getMonth() + 1) + "/" + dni?.nacimiento.getFullYear()) : ""} <br />
          <b>Número DNI: </b> {dni?.numeroDni ? dni?.numeroDni : ""} <br />
          {/*
          <b>Sexo: </b> {dni?.sexo ? dni?.sexo : ""} <br />
          <b>Número de trámite: </b> {dni?.numeroTramite ? dni?.numeroTramite : ""} <br />
          <b>Ejemplar: </b> {dni?.ejemplar ? dni?.ejemplar : ""} <br />
          <b>Fecha de emisión: </b>{dni?.fechaEmision ? (dni?.fechaEmision.getDate() + "/" + (dni?.fechaEmision.getMonth() + 1) + "/" + dni?.fechaEmision.getFullYear()) : ""} <br />
          <b>Inicio fin cuil: </b>{dni?.inicioFinCuil ? dni?.inicioFinCuil : ""} <br />
          */}
          <div style={{ marginTop: '25px' }}>
            <Input
              autoFocus
              style={{ width: 0, height: 0, border: 0, padding: 0, margin: 0 }}
              type="password"
              id="scannedData"
              value={auxText}
              onChange={(e) => setAuxText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escanear DNI"
            />
            <Button
              onClick={() => { document.getElementById("scannedData")?.focus(); setScann(!scann); setNewMember({} as MemberClub); setDni(undefined); }}
              variant='contained'
              color={scann ? "success" : "error"}
            > {scann ? "Escaneando..." : "Escanear"}</Button>

          </div>

          <div style={{ marginTop: '25px' }}>
            <Button
              onClick={() => dni ? handleAssociateCustomer(dni) : ""}
              variant='contained'
            >
              Agregar cliente
            </Button>
          </div>
        </div>

        <div className='qrContainer'>
          <div className='qrImage'>
            <br></br>
            {newMember.id && (
              <QRCodeCanvas
                value={newMember.identificador}
                size={350}
                onChange={() => { document.getElementById("scannedData")?.focus(); }}
              />
            )}
          </div>

          <div className='qrText'>
            <p> {newMember.identificador ? ("QR-IDENTIFICADOR para: \n" + dni?.nombres + " " + dni?.apellidos) : ""} </p>
          </div>
        </div>
      </div>

      <div>
        <div style={{ marginLeft: "25%", marginTop: '200px', alignContent: 'center', alignItems: "center" }}>

          {newMember.id && (
            <Button
              color="success"
              variant='contained'
              onClick={handlePrint}
            >
              Imprimir
            </Button>
          )}
        </div>
      </div>

      <div style={{display: "none"}}>
        {(newMember.identificador && dni) && (
          <DataToIdentifierPrinterComponent
            ref= {componentRef}
            newMember={newMember}
            dni={dni}
          />)}
      </div>
    </>

  );
}

export default GenerateIdentifierAssociationView