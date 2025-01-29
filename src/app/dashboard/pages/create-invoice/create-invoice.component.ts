import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorFormsComponent } from '../../../shared/components/error-forms/error-forms.component';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { CreateInvoice, ItemProducts } from '../../interfaces/createInvoice.interface';
import { DatumDepartments, Departments } from '../../interfaces/departments.interface';
import { InvoicesService } from '../../services/invoices.service';

function generateTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorFormsComponent],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export default class CreateInvoiceComponent implements OnInit, OnDestroy {

  private invoicesService = inject(InvoicesService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private valitarorsService = inject(ValidatorsService);

  public departments = signal<Departments[]>([]);
  public productsInvoice = signal<ItemProducts[]>([]);
  public products = signal<ItemProducts[]>([]);

  private departmentsSubscription!: Subscription;
  private createInvoiceSubscription!: Subscription;

  ngOnInit(): void {
    this.listDepartments();
    this.products.set([
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
        tax_rate: "5.00",
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
        tax_rate: "5.00",
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
        tax_rate: "5.00",
        unit_measure_id: 70,
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: 1,
        withholding_taxes: []
      }
    ]);
  }

  public myFormDataPerson: FormGroup = this.fb.group({
    typeClient: ['', [Validators.required]],
    typeIdentification: ['', [Validators.required]],
    identification: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(this.valitarorsService.emailPattern)]],
    municipality: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    paymentMethod: ['', [Validators.required]],
  });

  public myFormDataProductInvoice: FormGroup = this.fb.group({
    codeProduct: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    ivaApply: ['', [Validators.required]],
  });

  isValidField(myForm: FormGroup, field: string) {
    return this.valitarorsService.isValidField(myForm, field);
  }

  getFieldError(myForm: FormGroup, field: string) {
    return this.valitarorsService.getFieldError(myForm, field);

  }

  listDepartments() {

    this.departmentsSubscription = this.invoicesService.departmentsListing().subscribe({
      next: (resp: DatumDepartments) => {
        this.departments.set(resp.data);
      }, error: (err) => {
        console.log(err);
      }
    });

  }

  addProductInvoice() {
    if (this.myFormDataProductInvoice.invalid) {
      this.myFormDataProductInvoice.markAllAsTouched();
    } else {
      const codeProduct = this.myFormDataProductInvoice.value.codeProduct;
      let product = this.products().find(produ => produ.code_reference === codeProduct);

      const number = Number(this.myFormDataProductInvoice.value.discount);
      const discountDecimal = parseFloat(number.toFixed(2));

      product!.quantity = Number(this.myFormDataProductInvoice.value.amount);
      product!.discount = discountDecimal; //pasardecimal
      product!.is_excluded = Number(this.myFormDataProductInvoice.value.ivaApply);

      const price = product!.price * product!.quantity;
      product!.price = price;
      this.productsInvoice().push(product!);
      this.myFormDataProductInvoice.reset();
    }
  }

  deleteProductInvoice(codeProduct: string) {
    const products = this.productsInvoice().filter(produ => produ.code_reference !== codeProduct);
    this.productsInvoice.set(products);
  }

  createInvoice() {

    if (this.myFormDataPerson.invalid) {
      this.myFormDataPerson.markAllAsTouched();
    } else {
      if (this.productsInvoice().length <= 0) {
        console.log('debe agregar productos a la factura');
      } else {
        const code = `FACT_${generateTimestamp()}`

        const data: CreateInvoice = {
          document: "01",
          numbering_range_id: 8,
          reference_code: code,
          observation: "",
          payment_method_code: this.myFormDataPerson.value.paymentMethod,
          customer: {
            identification: this.myFormDataPerson.value.identification,
            // dv: "3",
            // company: "",
            // trade_name: "",
            names: this.myFormDataPerson.value.name,
            address: this.myFormDataPerson.value.address,
            email: this.myFormDataPerson.value.email,
            phone: this.myFormDataPerson.value.phone,
            legal_organization_id: this.myFormDataPerson.value.typeClient,
            tribute_id: "21",
            identification_document_id: this.myFormDataPerson.value.typeIdentification,
            municipality_id: this.myFormDataPerson.value.municipality,
          },
          items: this.productsInvoice()
        }
        this.myFormDataPerson.reset();
        this.productsInvoice.set([]);
        this.createInvoiceSubscription = this.invoicesService.createInvoice(data).subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    }
  }

  redirectListInvoice() {
    this.router.navigate(['./invoicesList']);
  }

  ngOnDestroy(): void {
    if (this.departmentsSubscription) {
      this.departmentsSubscription.unsubscribe();
    }

    if (this.createInvoiceSubscription) {
      this.createInvoiceSubscription.unsubscribe();
    }
  }

}
