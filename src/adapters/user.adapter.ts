export const createUserAdapter = (user: any) => {
  try {
    return {
      id_token: user.id_token,
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.imageUrl,
      activated: user.activated,
      langKey: user.langKey,
      club: user.club,
      worker: user.worker
    };
  } catch (error) {
    // Manejar el error aquí
    console.error(error);
    return null;
  }
};
