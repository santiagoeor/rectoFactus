import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PrimeNgModule } from '../../../shared/prime-ng.module';

@Component({
  selector: 'app-best-menu',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './best-menu.component.html',
  styleUrl: './best-menu.component.css'
})
export class BestMenuComponent implements OnInit {

  private router = inject(Router);

  public items = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.menuItem();
  }

  menuItem() {
    this.items.set([
      {
        label: 'Crear Factura',
        icon: 'pi pi-fw pi-plus-circle',
        command: () =>
          this.router.navigate(['./createInvoice']),
      },
      {
        label: 'Facturas',
        icon: 'pi pi-fw pi-th-large',
        command: () =>
          this.router.navigate(['./invoicesList']),
      },
    ])
  }

}
