import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  getAllClients(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/client/getAll`);
  }
}
