import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../env/enviroment';
import { CreateInvoice } from '../interfaces/createInvoice.interface';
import { DatumDepartments } from '../interfaces/departments.interface';
import { Invoices } from '../interfaces/invoices.interface';
import { PDFInvoice } from '../interfaces/pdfInvoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private http = inject(HttpClient);

  private baseUrl = enviroment.url_api;

  listOfInvoices(): Observable<Invoices> {
    return this.http.get<Invoices>(`${this.baseUrl}/v1/bills`);
  }

  listOfInvoicesPage(page: number): Observable<Invoices> {
    return this.http.get<Invoices>(`${this.baseUrl}/v1/bills?page=${page}`);
  }

  createInvoice(data: CreateInvoice): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/bills/validate`, data);
  }

  departmentsListing(): Observable<DatumDepartments> {
    return this.http.get<DatumDepartments>(`${this.baseUrl}/v1/municipalities`);
  }

  downoaldInvoice(numberInvoice: string): Observable<PDFInvoice> {
    return this.http.get<PDFInvoice>(`${this.baseUrl}/v1/bills/download-pdf/${numberInvoice}`);
  }
}
