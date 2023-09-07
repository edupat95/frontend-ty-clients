export const createTableAdapter = (table: any) => ({
  id: table.id,
  number: table.numeroMesa,
  estado: table.estado,
  createdDate: table.createdDate,
  updatedDate: table.updatedDate,
  club: table.club
});

/*
export interface Table {
    id: number,
    numeroMesa: number,
    estado: boolean,
    createdDate: string,
    updatedDate: string,
    club: Club
    
}
*/