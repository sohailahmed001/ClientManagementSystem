import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ListInvoicesComponent implements OnInit {
  clientSelected: Client;
  clientOptions: any[] = [];
  invoices: Invoice[];

  constructor(
    private clientService: ClientService,
    private utilsService: UtilsService,
    private invoiceService: InvoiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.getClient(data.clientId);
    });
  }

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

  getClient(clientId: any) {
    if (clientId) {
      this.clientService.getClientById(clientId).subscribe((response) => {
        this.clientSelected = response;
        this.searchInvoices();
      });
    }
  }
}
