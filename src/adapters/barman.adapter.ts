export const createBarmanAdapter = (barman: any) => ({
    id: barman.id,
    estado: barman.estado,
    createdDate: barman.createdDate,
    updatedDate: barman.updatedDate,
    worker: barman.worker
});


