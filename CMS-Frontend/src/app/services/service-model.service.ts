import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceModel } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceModelService {
  editServiceDialogId: number;

  constructor(private httpClient: HttpClient) {}

  getAllServices(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/service/getAll`);
  }

  getServiceById(id: number): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/service/get/${id}`
    );
  }

  saveService(service: ServiceModel): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/service/add`,
      service
    );
  }

  deleteServiceById(id: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/service/delete/${id}`
    );
  }
}
