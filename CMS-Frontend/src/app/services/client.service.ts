import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  getAllClients(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/client/getAll`);
  }

  getClientById(id: number): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/client/get/${id}`
    );
  }

  saveClient(clientFormData: FormData): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/client/add`,
      clientFormData
    );
  }
}
