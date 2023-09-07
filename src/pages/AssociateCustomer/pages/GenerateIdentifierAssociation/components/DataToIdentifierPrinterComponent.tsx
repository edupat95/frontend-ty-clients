import React, { forwardRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react';
import { Dni } from '../../../../../models/AssociateCustomer/dni.model';
import { MemberClub } from '../../../../../models/Cashier/memberClub.model';

type Props = {
  newMember: MemberClub;
  dni: Dni;
};

type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

const titleStyle = {
  fontSize: "30px",
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal",
  width: "100%",
  textAlign: "center" as TextAlign
};

const headerTicketStyle = {
  fontSize: "30px",
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal",
  width: "100%"
}

const DataToIdentifierPrinterComponent = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div ref={ref} style={{ justifyContent: 'center', alignItems: 'center' }} >
      <div style={headerTicketStyle}>
        <h3 style={titleStyle}>NO PIERDA NI PRESTE ESTE IDENTIFICADOR</h3>
        <h5 style={titleStyle}>Propietario: {props.dni.nombres} {props.dni.apellidos}</h5>
        <h5 style={titleStyle}>Dni: {props.dni.numeroDni}</h5>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        paddingTop: '20px'
      }}
      >
        <QRCodeCanvas
          value={props.newMember.identificador}
          size={700}
          onChange={() => { document.getElementById("scannedData")?.focus(); }}
        />
      </div>


      <h5 style={titleStyle}>
        TY Clients system ®. founder: Eduardo Michel Patinella<br />
        Email: eduardo.patinella@tyclients.com
      </h5>
    </div>
  )
})

export default DataToIdentifierPrinterComponent