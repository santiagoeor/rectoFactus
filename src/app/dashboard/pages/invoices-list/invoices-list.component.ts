import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrimeNgModule } from '../../../shared/prime-ng.module';
import { BestMenuComponent } from '../../components/best-menu/best-menu.component';
import { DataInvoices, Invoices } from '../../interfaces/invoices.interface';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [PrimeNgModule, BestMenuComponent],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.css'
})
export default class InvoicesListComponent implements OnInit, OnDestroy {

  private invoicesService = inject(InvoicesService);
  private router = inject(Router);

  public invoices = signal<DataInvoices[]>([]);
  public loading = signal<boolean>(false);

  private invoiceSubscription!: Subscription;

  public first = signal<number>(0);
  public rows = signal<number>(0);
  public totalInvoices = signal<number>(0);

  ngOnInit(): void {
    this.listInvoices();
  }

  listInvoices() {
    this.loading.set(true);
    this.invoiceSubscription = this.invoicesService.listOfInvoices().subscribe({
      next: (resp: Invoices) => {
        this.loading.set(false);
        this.rows.set(resp.data.pagination.per_page);
        this.first.set(resp.data.pagination.current_page);
        this.totalInvoices.set(resp.data.pagination.total);
        this.invoices.set(resp.data.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onPageChange(event: any) {
    const page = event.page + 1;
    this.first.set(event.first);
    this.rows.set(event.rows);
    this.loading.set(true);
    this.invoices.set([]);

    this.invoicesService.listOfInvoicesPage(page).subscribe({
      next: (resp) => {
        this.loading.set(false);
        this.totalInvoices.set(resp.data.pagination.total);
        this.invoices.set(resp.data.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
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

  redirectCreateInvoice() {
    this.router.navigate(['./createInvoice']);
  }

  ngOnDestroy(): void {
    if (this.invoiceSubscription) {
      this.invoiceSubscription.unsubscribe();
    }
  }

}
