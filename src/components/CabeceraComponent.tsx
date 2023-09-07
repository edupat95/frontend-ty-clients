import React, { useEffect } from 'react';
import { getSession, getCashier, getRecorder, getWorker, getBarman } from '../utilities/public.utilities';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import "../styles/CabeceraComponent.css";

const CabeceraComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        getSession().id ? <></> : navigate("/login");
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    const getTipo = () => {
        let tipo = "No identificado";
        //console.log("Cashier" + JSON.stringify(getCashier()) + "Recorder" + JSON.stringify(getRecorder()) + "Worker" + JSON.stringify(getWorker()));
        if (getCashier().id != null) {
            if (getCashier().box !== null) {
                tipo = "Cajero(" + getCashier()?.box.nombre + ")";
            } else {
                tipo = "Cajero(SIN CAJA ASIGNADA)";
            }
        } else if (getRecorder().id != null) {
            tipo = "Registrador";
        } else if (getBarman().id != null) {
            tipo = "Barman";
        } else {
            tipo = "Administrador";
        }
        return tipo;
    }
    return (
        <div className='cabeceraComponent'>
            <div style={{ display: "flex", width: "65%" }}>
                <p> {"Usuario: " + (getSession().firstName ? getSession().firstName : "WITH OUT NAME")} </p>
                <p style={{ paddingLeft: "7%" }}> {"Empresa: " + (getSession().club?.nombre ? getSession().club?.nombre : logout())} </p>
                <p style={{ paddingLeft: "7%" }}> {"Tipo usuario: " + getTipo()} </p>
                <Button
                    onClick={() => logout()}
                    color="error"
                    variant='contained'
                    style={{ right: "0", position: "absolute", marginTop: "10px", marginRight: "50px" }}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default CabeceraComponent;