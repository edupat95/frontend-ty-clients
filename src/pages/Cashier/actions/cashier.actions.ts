import {Product} from "../../../models/Cashier/product.model";
import {ProductInCart} from "../../../models/Cashier/productInCart.model";
import { Table } from "../../../models/Cashier/table.model";


type CashierActionType =
| { type: "LIST_PRODUCT_MENU", payload: Array<Product> }
| { type: "ADD_TO_CART", payload: Product }
| { type: "ADD_ONE_TO_CART", payload: Product }
| { type: "REMOVE_ONE_FROM_CART", payload: Product }
| { type: "REMOVE_ALL_FROM_CART", payload: Product }
| { type: "CLEAR_CART" }
| { type: "LIST_TABLES", payload: Array<Table>}

type stateType = {
    products: Product[],
    cart: ProductInCart[],
    tables: Table[]
  }
export type { CashierActionType, stateType };