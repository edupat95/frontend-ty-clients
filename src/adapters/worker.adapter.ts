export const createWorkerAdapter = (worker: any) => {
    try {
      return {
        id: worker.id,
        estado: worker.estado,
        user: worker.user,
        club: worker.club,
        descripcion: worker.descripcion,
      };
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
      return null;
    }
  };
  