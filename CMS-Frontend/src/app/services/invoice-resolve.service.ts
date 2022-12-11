import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { InvoiceService } from './invoice.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceResolveService implements Resolve<Invoice> {
  constructor(private invoiceService: InvoiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Invoice> {
    const invoiceId = +route.paramMap.get('id');

    if (invoiceId) {
      return this.invoiceService.getInvoiceById(invoiceId);
    } else {
      return of(new Invoice());
    }
  }
}
