import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { ClientResolveService } from './client-resolve.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}

  getAllClients(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/client/getAll`);
  }

  getClientById(id: number): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/v1/client/get/${id}`)
      .pipe(
        map((client: any) => {
          client.dob = new Date(client.dob);
          return client;
        })
      );
  }

  saveClient(clientFormData: FormData): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/client/add`,
      clientFormData
    );
  }

  deleteClientById(id: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/client/delete/${id}`
    );
  }

  getClientsContaining(searchText: string) {
    return this.httpClient
      .get(`${environment.baseUrl}/api/v1/client/get/containing/${searchText}`)
      .pipe(
        map((data: any[]) => {
          data.forEach(
            (client) =>
              (client.description = `${client.firstName} ${client.lastName} - ${client.email}`)
          );

          return data;
        })
      );
  }
}
