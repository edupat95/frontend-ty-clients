import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
import { Dni } from '../../../../models/AssociateCustomer/dni.model';
import { linkCustomerService } from '../../services/associateCustomer.services';

const LinkIdentifierToDocumento = () => {
    const [scannDni, setScannDni] = useState<Boolean>(false);
    const [scannIdentifier, setScannIdentifier] = useState<Boolean>(false);
    const [dni, setDni] = useState<Dni | undefined>();
    const [identifier, setIdentifier] = useState<string | undefined>();
    const [auxText, setAuxText] = useState("");
    const [auxIdentifier, setAuxIdentifier] = useState("");

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) { // Verificar si se presionó "Enter"
            await obtenerDatos(auxText, '"');
            console.log(`User typed: ${auxText}`);
            setAuxText("");
        } else if (event.key.match(/^[a-zA-Z0-9 \-"]$/)) {
            setAuxText((prevTypedText) => prevTypedText + event.key);
        }
        event.preventDefault();
    };

    const handleKeyDownIdentifier = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) { // Verificar si se presionó "Enter"
            setIdentifier(auxIdentifier);
            console.log(`User typed: ${auxIdentifier}`);
            setAuxIdentifier("");
        } else if (event.key.match(/^[a-zA-Z0-9 \-"]$/)) {
            setAuxIdentifier((prevTypedText) => prevTypedText + event.key);
            //console.log(event.key);
        }
        event.preventDefault();
    };

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
        console.log("->" + JSON.stringify(dni));
        setDni(dni);
        return datosDocumento;
    }

    const handleLink = async () => {
        console.log("dni: " + JSON.stringify(dni) + "Type: " + typeof dni);
        console.log("identifier: " + JSON.stringify(identifier) + "Type: " + typeof identifier);

        // Expresión regular para validar un UUID
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        
        if (typeof identifier === "string" && uuidRegex.test(identifier)) {
            if (dni === undefined || dni?.numeroDni == 0) {
                alert("No hay datos del cliente");
                return 0;
              } else {
                const res = await linkCustomerService(dni, identifier);
                console.log("res: " + JSON.stringify(res));
                if (res != null) {
                  alert("Cliente vinculado correctamente");
                } else {
                  alert("No se pudo vincular el cliente, cambie de tarjeta");
                }
              }
        } else {
            console.log("-----> El identifier NO es un UUID válido.");
        }
        
    }

return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', margin: '50px' }}>
        <div >
            <b>Apellidos: </b> {dni?.apellidos ? dni?.apellidos : ""} <br />
            <b>Nombres: </b> {dni?.nombres ? dni?.nombres : ""} <br />
            <b>Nacimiento: </b> {dni?.nacimiento ? (dni?.nacimiento.getDate() + "/" + (dni?.nacimiento.getMonth() + 1) + "/" + dni?.nacimiento.getFullYear()) : ""} <br />
            <b>Número DNI: </b> {dni?.numeroDni ? dni?.numeroDni : ""} <br />

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
                    onClick={() => { document.getElementById("scannedData")?.focus(); setScannDni(!scannDni); setDni(undefined); scannIdentifier && setScannIdentifier(!scannIdentifier); }}
                    variant='contained'
                    color={scannDni ? "success" : "error"}
                > {scannDni ? "Escaneando..." : "Escanear documento"}</Button>
            </div>
            <div style={{ marginTop: '25px' }}>
                <Input
                    autoFocus
                    style={{ width: 0, height: 0, border: 0, padding: 0, margin: 0 }}
                    type="password"
                    id="scannedDataIdentifier"
                    value={auxIdentifier}
                    onChange={(e) => setAuxIdentifier(e.target.value)}
                    onKeyDown={handleKeyDownIdentifier}
                    placeholder="Escanear IDENTIFICADOR"
                />
                <Button
                    onClick={() => { document.getElementById("scannedDataIdentifier")?.focus(); setScannIdentifier(!scannIdentifier); setIdentifier(undefined); scannDni && setScannDni(!scannDni); }}
                    variant='contained'
                    color={scannIdentifier ? "success" : "error"}
                > {scannIdentifier ? "Escaneando..." : "Escanear tarjeta"}</Button>
            </div>

            <div style={{ marginTop: '25px' }}>
                {(identifier && dni) && (
                    <Button
                        onClick={() => { handleLink(); setScannDni(false); setScannIdentifier(false); setDni(undefined); setIdentifier(undefined); }}
                        variant='contained'
                    >
                        Vincular
                    </Button>
                )}
            </div>

        </div>




    </div >
);
};

export default LinkIdentifierToDocumento;
