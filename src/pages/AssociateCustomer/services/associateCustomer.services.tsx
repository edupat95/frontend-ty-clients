import axios from 'axios';
import { getSession, getRecorder } from '../../../utilities/public.utilities';
import { Dni } from '../../../models/AssociateCustomer/dni.model';
import { MemberClub } from '../../../models/Cashier/memberClub.model';
import { createMemberClubAdapter } from '../../../adapters/Cashier/memberClub.adapter';
import { API_URL } from '../../../config/constants';
const associateCustomer = async (dni: Dni) => {
  //console.log("associateCustomer.services.tsx -> associateCustomer() -> dni: " + JSON.stringify(dni));
  //console.log("associateCustomer.services.tsx -> associateCustomer() -> Recorder: " + JSON.stringify(getRecorder()));
  const data = {
    "Documento": {
      "numeroTramite": dni.numeroTramite,
      "apellidos": dni.apellidos,
      "nombres": dni.nombres,
      "sexo": dni.sexo,
      "numeroDni": dni.numeroDni,
      "ejemplar": dni.ejemplar,
      "nacimiento": dni.nacimiento,
      "fechaEmision": dni.fechaEmision,
      "inicioFinCuil": dni.inicioFinCuil,
      "user": null
    },
    "Registrador": {
      "id": getRecorder().id,
      "estado": getRecorder().estado
    },
    "idClub": getSession().club?.id,
  }

  //console.log("associateCustomer.services.tsx -> associateCustomer() -> data: " + JSON.stringify(data));

  const res = await axios.post<MemberClub>(API_URL + `/documentos/create/asociado-club`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    //console.error("Error al intentar realizar el cange. Type error -> " + error.response.status);
    return error.response.status;
  });

  //console.log("associateCustomer.services.tsx -> associateCustomer() -> res: " + JSON.stringify(res.data));

  if (res.status === 200) {
    const memberClub = createMemberClubAdapter(res.data);
    return memberClub;
  } else {
    return 0;
  }
  
  
};

const linkCustomerService = async (dni: Dni, identifier: string) => {
  const data = {
    "Documento": {
      "numeroTramite": dni.numeroTramite,
      "apellidos": dni.apellidos,
      "nombres": dni.nombres,
      "sexo": dni.sexo,
      "numeroDni": dni.numeroDni,
      "ejemplar": dni.ejemplar,
      "nacimiento": dni.nacimiento,
      "fechaEmision": dni.fechaEmision,
      "inicioFinCuil": dni.inicioFinCuil,
      "user": null
    },
    "Registrador": {
      "id": getRecorder().id,
      "estado": getRecorder().estado
    },
    "idClub": getSession().club?.id,
    "identificador": identifier
  }
  const res = await axios.post<MemberClub>(API_URL + `/documentos/link/asociado-club`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    //console.error("Error al intentar realizar el cange. Type error -> " + error.response.status);
    return error.response.status;
  });

  //console.log("associateCustomer.services.tsx -> associateCustomer() -> res: " + JSON.stringify(res.data));

  if (res.status === 200) {
    const memberClub = createMemberClubAdapter(res.data);
    return memberClub;
  } else {
    return 0;
  }
}

export { associateCustomer, linkCustomerService }