export const createClubAdapter = (club: any) => {
    try {
      return {
        id: club.id,
        nombre: club.nombre,
        direccion: club.direccion,
        estado: club.estado
      };
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
      return null;
    }
  };
   