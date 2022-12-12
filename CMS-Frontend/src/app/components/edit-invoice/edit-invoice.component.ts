import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { ClientService } from 'src/app/services/client.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css'],
})
export class EditInvoiceComponent implements OnInit {
  invoice: Invoice = new Invoice();
  pageTitle: string = 'Invoice Details';
  clientOptions: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.invoice = this.activatedRoute.snapshot.data['invoice'];
    this.pageTitle = this.invoice?.id
      ? `Invoice Details - (${this.invoice.number})`
      : 'Add Invoice';
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
}
