import { Component, inject, OnInit } from '@angular/core';
import { Invoices } from '../../interfaces/invoices.interface';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.css'
})
export default class InvoicesListComponent implements OnInit {

  private invoicesService = inject(InvoicesService);

  ngOnInit(): void {
    this.listInvoices();
  }

  listInvoices() {
    this.invoicesService.listOfInvoices().subscribe({
      next: (resp: Invoices) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
