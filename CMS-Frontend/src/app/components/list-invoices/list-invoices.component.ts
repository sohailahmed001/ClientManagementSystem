import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Invoice } from 'src/app/models/invoice.model';
import { ClientService } from 'src/app/services/client.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.css'],
})
export class ListInvoicesComponent {
  clientSelected: Client;
  clientOptions: any[] = [];
  invoices: Invoice[];

  constructor(
    private clientService: ClientService,
    private utilsService: UtilsService,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  searchClients(event: any) {
    this.clientService.getClientsContaining(event.query).subscribe(
      (response: any[]) => {
        this.clientOptions = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchInvoices() {
    if (this.clientSelected?.id) {
      this.invoiceService.getInvoicesByClient(this.clientSelected.id).subscribe(
        (response: any[]) => {
          this.invoices = response;
          console.log(this.invoices);
        },
        (error) => {
          console.log(error);
          this.utilsService.showErrorMessage(
            'There was a problem getting invoices'
          );
        }
      );
    } else {
      this.utilsService.showErrorMessage('Please select a Client');
    }
  }

  onViewInvoiceClick(invoiceId: number) {
    this.router.navigate(['edit-invoice', { id: invoiceId }]);
  }
}
