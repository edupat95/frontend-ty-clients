import { User } from '../models/user.model';
import axios from 'axios';
import { createWorkerAdapter } from '../adapters/worker.adapter';
import { createCashierAdapter } from '../adapters//Cashier/cashier.adapter';
import { createRecorderAdapter } from '../adapters/AssociateCustomer/recorder.adapter';
import { createUserAdapter } from '../adapters/user.adapter';
import { Recorder } from '../models/AssociateCustomer/recorder.model';
import { Worker } from '../models/worker.model';
import { Cashier } from '../models/Cashier/cashier.model'; 
import { createClubAdapter } from '../adapters/club.adapter';
import { Club } from '../models/club.model';
import { error } from 'console';
import { API_URL } from '../config/constants';
import { createBarmanAdapter } from '../adapters/barman.adapter';
import { Barman } from '../models/barman.model';

const login = async (username:string, password:string) => {
  //console.log("Lo que llega a services/login " + username + " - " + password);
  
  const data = JSON.stringify({
    "username": username,
    "password": password
  });

  const response = await axios.post(API_URL +'/authenticate', data , { headers: {'Content-Type': 'application/json'} })
  .then(function (response) {
    //console.log("service/authenticate/response->" + JSON.stringify(response));
    return response;
  })
  .catch(function (error) {
    //console.log("Error al autenticarse y obtener el token. Type error -> " + error);
    return error;
  });

  //console.log("DATOS OBJTENIDOS EN RESPONSE -> " + JSON.stringify(response.code));
  switch(response.code){
    case "ERR_NETWORK":
      return 0;
    case "ERR_BAD_REQUEST":
      return 401;
    default:
      break;
  }

  const response2 = await axios.get(API_URL + '/account', { headers: {'Authorization': 'Bearer ' + response.data.id_token}})
  .then(function (response) {
    //console.log("service/account/response->" + JSON.stringify(response));
    return response;
  })
  .catch(function (error) {
    //console.error("Error al obtener datos del usuario. Type error -> " + error.response.status);
    return error.response.status;
  });


  switch(response2.code){ 
    case "ERR_NETWORK":
      return 0;
    case "ERR_BAD_REQUEST":
      return 401;
    default:
      break;
  }

  //console.log("DATOS OBJTENIDOS EN RESPONSE2 -> " + JSON.stringify(response2.data));
  
  if((response.status === 200 && response2.status === 200)){
    
    const worker = await getWorkerByUser(response.data.id_token, response2.data.id);

    //console.log("DATOS DE WORKER -> " + JSON.stringify(worker));

    if(worker === undefined){
      //console.log("Es udefined");
      return 1002;
    }

    let club: Club | null;
    if(worker != null && worker != undefined){
      //console.log("WROKER NO ES NULL", console.log(worker.club));
      club = createClubAdapter(worker.club);
      if(club === null){
        return 1002;
      }
    } else {
      const jsonClub = await getClubByIdUser(response.data.id_token, response2.data.id);
      club = createClubAdapter(jsonClub);
      if(club === undefined){
        return 1002;
      }
    }
    //console.log("DATOS DE CASHIER->" + JSON.stringify(cashier));
    //console.log("DATOS DEL CLUB ->" + createClubAdapter(worker.club).nombre);
    
    const usuario = {
      id_token: response.data.id_token,
      id: response2.data.id,
      login: response2.data.login,
      firstName: response2.data.firstName,
      lastName: response2.data.lastName,
      email: response2.data.email,
      imageUrl: response2.data.imageUrl,
      activated: response2.data.activated,
      langKey: response2.data.langKey,
      club: club
    };

    //console.log("DATOS RETORNADOS DE LOGIN -> " + JSON.stringify(usuario));

    return usuario;
  }

};

const getWorkerByUser = async (token: string, user_id: number) => {
  //console.log("USER ID BUSCADO: " + user_id)
  let response = await axios.get(API_URL + '/trabajadors/user/'+user_id, { headers: {'Authorization': 'Bearer ' + token}})
  .then(function (response) {
    //console.log("service->" + JSON.stringify(response));
    return response;
  })
  .catch(function (error) {
    //console.error("Error al obtener datos del trabajador. Type error -> " + error.response.status);
    return error.response.status;
  });
  
  if(response == 404){
    //console.log("No se ha encontrado el trabajador");
    return null;
  } else {
    //console.log("Trabajador recuperador:", JSON.stringify(response.data));
    const worker: Worker | null = createWorkerAdapter(response.data);
    
    return worker;
  }
  
}

const getCashierByWorker = async (token: string, worker_id: number) => {
  //console.log("USER ID BUSCADO: " + user_id)
  let response = await axios.get(API_URL + '/cajeros/trabajador/'+worker_id, { headers: {'Authorization': 'Bearer ' + token}})
  .then(function (response) {
    //console.log("service->" + JSON.stringify(response));
    return response;
  })
  .catch(function (error) {
    //console.error("Error al obtener datos del trabajador. Type error -> " + error.response.status);
    return error.response.status;
  });
  
  if(response.status === 200){
    const cashier: Cashier = createCashierAdapter(response.data);
    return cashier;
  } else {
    return null;
  }
  //console.log("Cajero recuperado:", JSON.stringify(response.data));
  
};

const getRecorderByWorker = async (token: string, worker_id: number) => {
  //console.log("USER ID BUSCADO: " + user_id)
  let response = await axios.get(API_URL + '/registradors/trabajador/'+worker_id, { headers: {'Authorization': 'Bearer ' + token}})
  .then(function (response) {
    //console.log("service->" + JSON.stringify(response));
    return response;
  })
  .catch(function (error) {
    //console.error("Error al obtener datos del trabajador. Type error -> " + error.response.status);
    return error.response.status;
  });
  if(response.status === 200){
    const recorder: Recorder = createRecorderAdapter(response.data);
    return recorder;
  } else {
    return null;
  }
};

const getBarmanByWorker = async (token: string, worker_id: number) => {
  //console.log("USER ID BUSCADO: " + user_id)
  let response = await axios.get(API_URL + '/entregadors/trabajador/'+worker_id, { headers: {'Authorization': 'Bearer ' + token}})
  .then(function (response) {
    //console.log("service->" + JSON.stringify(response));
    return response;
  })
  .catch(function (error) {
    //console.error("Error al obtener datos del trabajador. Type error -> " + error.response.status);
    return error.response.status;
  });
  if(response.status === 200){
    const barman: Barman = createBarmanAdapter(response.data);
    return barman;
  } else {
    return null;
  }
  
}

const getClubByIdUser = async (token: string, user_id: number) => {
  let response = await axios.get(API_URL + '/clubs/user/'+user_id, { headers: {'Authorization': 'Bearer ' + token}})
  .then(function (response) {
    //console.log("service->" + JSON.stringify(response));
    return response;
  })
  .catch(function (error) {
    console.error("Error al obtener el Club con el id de usuario Adminitrador. Type error -> " + error.response.status);
    return error.response.status;
  });

  //console.log("CLUB RECUPERADO -> " + JSON.stringify(response.data));

  if(response.status === 200){
    const club: Club | null = createClubAdapter(response.data);
    return club;
  } else {
    return null;
  }
};


export {login, getCashierByWorker, getWorkerByUser, getRecorderByWorker, getBarmanByWorker}
