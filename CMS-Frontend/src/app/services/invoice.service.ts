import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  getInvoicesByClient(clientId: number): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/v1/invoice/get/client/${clientId}`)
      .pipe(
        map((data: any[]) => {
          data.forEach(
            (invoice) => (invoice.servicesCount = invoice.services?.length || 0)
          );
          return data;
        })
      );
  }

  getInvoiceById(id: number): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/invoice/get/${id}`
    );
  }
}