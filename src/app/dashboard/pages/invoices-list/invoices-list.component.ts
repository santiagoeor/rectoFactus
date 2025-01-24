import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataInvoices, Invoices } from '../../interfaces/invoices.interface';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.css'
})
export default class InvoicesListComponent implements OnInit, OnDestroy {

  private invoicesService = inject(InvoicesService);

  public invoices = signal<DataInvoices[]>([]);

  private invoiceSubscription!: Subscription;

  ngOnInit(): void {
    this.listInvoices();
  }

  listInvoices() {
    this.invoiceSubscription = this.invoicesService.listOfInvoices().subscribe({
      next: (resp: Invoices) => {
        console.log(resp);
        this.invoices.set(resp.data.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.invoiceSubscription) {
      this.invoiceSubscription.unsubscribe();
    }
  }

}
