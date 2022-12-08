import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client.model';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root',
})
export class ClientResolveService implements Resolve<Client> {
  constructor(private clientService: ClientService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client> {
    const clientId = +route.paramMap.get('id');

    if (clientId) {
      return this.clientService.getClientById(clientId);
    } else {
      return of(new Client());
    }
  }
}
