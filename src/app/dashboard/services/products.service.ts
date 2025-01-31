import { Injectable } from '@angular/core';
import { ItemProducts } from '../interfaces/createInvoice.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  listProducts(): ItemProducts[] {
    return [
      {
        code_reference: "CO1",
        name: "Licuadora Oster",
        quantity: 1,
        discount: 0,  //8403.36
        discount_rate: 0,
        price: 300000,
        tax_rate: "19.00",
        unit_measure_id: 70,
        standard_code_id: 1,
        is_excluded: 0, //iva
        tribute_id: 1,
        withholding_taxes: []
      },
      {
        code_reference: "CO2",
        name: "Televisor Samsung",
        quantity: 1,
        discount: 0,
        discount_rate: 0,
        price: 1200000,
        tax_rate: "19.00",
        unit_measure_id: 70,
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: 1,
        withholding_taxes: []
      },
      {
        code_reference: "CO3",
        name: "Almohadas",
        quantity: 1,
        discount: 0,
        discount_rate: 0,
        price: 60000,
        tax_rate: "19.00",
        unit_measure_id: 70,
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: 1,
        withholding_taxes: []
      },
      {
        code_reference: "CO4",
        name: "Silla Rimax",
        quantity: 1,
        discount: 0,
        discount_rate: 0,
        price: 80000,
        tax_rate: "19.00",
        unit_measure_id: 70,
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: 1,
        withholding_taxes: []
      }
    ]
  }

}
