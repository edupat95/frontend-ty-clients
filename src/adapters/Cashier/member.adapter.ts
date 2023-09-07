export const createMemberAdapter = (member: any) => ({
    id: member.id,
    estado: member.estado,
    idDocumento: {
        id: member.documento.id,
        numeroTramite: member.documento.numeroTramite,
        apellidos: member.documento.apellidos,
        nombres: member.documento.nombres,
        sexo: member.documento.sexo,
        numeroDni: member.documento.numeroDni,
        ejemplar: member.documento.ejemplar,
        nacimiento: member.documento.nacimiento,
        fechaEmision: member.documento.fechaEmision,
        inicioFinCuil: member.documento.inicioFinCuil
    }
});

    