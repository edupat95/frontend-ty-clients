import { Worker } from "../worker.model"
import { Box } from "./box.model"
export interface Cashier {
  id: number,
  plataDeCambio: number,
  type: number,
  estado: Boolean,
  worker: Worker,
  box: Box
}

