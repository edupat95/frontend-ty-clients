import React, { useEffect, useState } from 'react';
import { getBarmanByWorker, login } from '../../services/public.service';
import { createUserAdapter } from '../../adapters/user.adapter'
import { createUser } from '../../redux/states/user';
import "./styles/Login.css";
import { useDispatch } from 'react-redux';
//import { AppStore } from '../../redux/store';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getWorkerByUser, getCashierByWorker, getRecorderByWorker } from '../../services/public.service';
import { User } from '../../models/user.model';
import { TextField } from '@mui/material';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  //const userState = useSelector((store: AppStore) => store.user); 
  const [errorLogin, setErrorLogin] = useState('');
  //const [statusLogin, setStatusLogin] = useState(false);

  const handleClick = async () => {
    //console.log("Datos que tengo que mandar: " + username + " - " + password);
    const user = await login(username, password);
    //console.log("Login page/handleclick -> " + JSON.stringify(user));
    if (user === 401) {
      console.error("Error en las credenciales");
      setErrorLogin("Error en las credenciales");
    } else if (user === 0) {
      console.error("Error en el servidor");
      setErrorLogin("Error en el servidor");
    } else if (user === 1002) {
      console.error("Error: 1002, comuniquese con soporte técnico TYClients.");
      setErrorLogin("Error: 1002, comuniquese con soporte técnico de TYClients.");
    } else {
      //console.log("EL USUARIO EXISTE: " + user);
      setErrorLogin('');
      await dispatch(createUser(createUserAdapter(user)));
      await localStorage.setItem('user', JSON.stringify(user));
      const worker = await getWorkerByUser(user ? user?.id_token : "", user ? user?.id : 0);
      //console.log("¿SE ENCONTRO WORKER?: " + worker);
      if (worker != null) {
        const cashier = await getCashierByWorker(user ? user?.id_token : "", worker ? worker?.id : 0);
        const recorder = await getRecorderByWorker(user ? user?.id_token : "", worker ? worker?.id : 0);
        const barman = await getBarmanByWorker(user ? user?.id_token : "", worker ? worker?.id : 0);
        if (cashier) {
          //console.log("ES UN CAJERO");
          await localStorage.setItem('cashier', JSON.stringify(cashier));
          //console.log("Desde login: " + localStorage.getItem('user'),"\n Worker:", cashier.worker , "\n Cajero:" , cashier);
          navigate("/cashier");
        } else if (recorder) {
          //console.log("ES UN REGISTRADOR");
          await localStorage.setItem('recorder', JSON.stringify(recorder));
          //console.log("Desde login: " + localStorage.getItem('user'),"\n Worker:", recorder.worker , "\n Registrador:" , recorder);
          navigate("/associate-customer");
        } else if (barman) {
          console.log("ES UN BARMAN");
          await localStorage.setItem('barman', JSON.stringify(barman));
          //console.log("Desde login: " + localStorage.getItem('user'),"\n Worker:", barman.worker , "\n Barman:" , barman);
          navigate("/barman");
        }
      } else {
        //console.log("ES UN ADMINISTRADOR");
        await localStorage.setItem('admin', JSON.stringify(user));
        navigate("/administration");
      }

      //await localStorage.setItem('worker', JSON.stringify(worker));
      //setStatusLogin(true); //se puede redireccionar de otra forma, no se cual seria la mejor.
    }

  };

  useEffect(() => {
    localStorage.setItem('user', '');
  }, []);
  
  return (
    <>
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div style={{ padding: "7%" }}>
            <label> TY Clients ®</label>
          </div>
          <div style={{ padding: "5%" }}>
            <TextField
              type="text"
              name="username"
              label="Username"
              variant="filled"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </div>
          <div style={{ padding: "5%" }}>
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="filled"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          <div className='button'>
            <Button variant="contained" size='small' color="success" onClick={() => handleClick()}>Login</Button>
          </div>
          <p style={{ fontSize: 15, color: 'red' }}>{errorLogin}</p>

        </div>
      </div>
    </>
  );
}

export default Login