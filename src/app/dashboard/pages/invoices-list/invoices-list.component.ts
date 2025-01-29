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
        this.invoices.set(resp.data.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  showPdf(base64String: string): void {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  pdfInvoice(numberInvoice: string) {
    this.invoicesService.downoaldInvoice(numberInvoice).subscribe({
      next: (resp) => {
        console.log(resp);
        this.showPdf(resp.data.pdf_base_64_encoded);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.invoiceSubscription) {
      this.invoiceSubscription.unsubscribe();
    }
  }

}
