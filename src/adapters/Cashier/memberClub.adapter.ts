export const createMemberClubAdapter = (memberClub: any) => ({
  id: memberClub.id,
  identificador: memberClub.identificador,
  fechaAsociacion: memberClub.fechaAsociacion,
  puntosClub: memberClub.puntosClub,
  estado: memberClub.estado,
  idAsociado: {
      id: memberClub.asociado.id,
      estado: memberClub.asociado.estado
  },
  club: memberClub.club,
  idRegistrador: memberClub.registrador
});


