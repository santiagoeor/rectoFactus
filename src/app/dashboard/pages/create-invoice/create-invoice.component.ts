import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateInvoice } from '../../interfaces/createInvoice.interface';
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
  imports: [],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export default class CreateInvoiceComponent implements OnInit, OnDestroy {

  private invoicesService = inject(InvoicesService);

  public departments = signal<Departments[]>([]);

  private departmentsSubscription!: Subscription;

  ngOnInit(): void {
    this.listDepartments();
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

  createInvoice() {

    const code = `FACT_${generateTimestamp()}`

    const data: CreateInvoice = {
      document: "01",
      numbering_range_id: 8,
      reference_code: code,
      observation: "",
      payment_method_code: "10",
      customer: {
        identification: "123456789",
        // dv: "3",
        // company: "",
        // trade_name: "",
        names: "Santiago",
        address: "calle 1 # 2-68",
        email: "santiago@gmail.com",
        phone: "1234567890",
        legal_organization_id: "2",
        tribute_id: "21",
        identification_document_id: 3,
        municipality_id: "714"
      },
      items: [
        {
          code_reference: "12345",
          name: "producto de prueba",
          quantity: 1,
          discount: 8403.36,
          discount_rate: 0,
          price: 50000,
          tax_rate: "19.00",
          unit_measure_id: 70,
          standard_code_id: 1,
          is_excluded: 0,
          tribute_id: 1,
          withholding_taxes: []
        },
        {
          code_reference: "54321",
          name: "producto de prueba 2",
          quantity: 1,
          discount: 0,
          discount_rate: 0,
          price: 50000,
          tax_rate: "5.00",
          unit_measure_id: 70,
          standard_code_id: 1,
          is_excluded: 0,
          tribute_id: 1,
          withholding_taxes: []
        }
      ]
    }

    this.invoicesService.createInvoice(data).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.departmentsSubscription) {
      this.departmentsSubscription.unsubscribe();
    }
  }

}
