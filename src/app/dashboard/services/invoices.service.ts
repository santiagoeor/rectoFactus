import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../env/enviroment';
import { Invoices } from '../interfaces/invoices.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private http = inject(HttpClient);

  private baseUrl = enviroment.url_api;

  listOfInvoices(): Observable<Invoices> {
    return this.http.get<Invoices>(`${this.baseUrl}/v1/bills`);
  }
}
