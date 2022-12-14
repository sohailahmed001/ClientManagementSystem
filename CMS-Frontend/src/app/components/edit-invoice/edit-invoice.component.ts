import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Invoice } from 'src/app/models/invoice.model';
import { ServiceModel } from 'src/app/models/service.model';
import { ClientService } from 'src/app/services/client.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ServiceModelService } from 'src/app/services/service-model.service';
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
  services: any[] = [];
  selectedService: any = new ServiceModel();
  readOnly: boolean = false;

  constructor(
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private utilsService: UtilsService,
    private router: Router,
    private serviceModelService: ServiceModelService
  ) {}

  ngOnInit(): void {
    this.invoice = this.activatedRoute.snapshot.data['invoice'];
    if (this.invoice.id) {
      this.pageTitle = this.readOnly
        ? `Invoice Details - (${this.invoice.number})`
        : `Update Invoice  - (${this.invoice.number})`;
    } else {
      this.pageTitle = 'Generate Invoice';
    }

    this.getServices();
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

  getServices() {
    this.serviceModelService.getAllServices().subscribe((response) => {
      this.services = response;
    });
  }

  onAddServiceClick() {
    const newService = new ServiceModel();
    newService.id = this.selectedService.id;
    newService.serviceName = this.selectedService.serviceName;
    newService.description = this.selectedService.description;
    newService.price = this.selectedService.price;

    this.invoice.services = this.invoice.services || [];
    this.invoice.services.push(newService);
    this.calcInvoice();
  }

  onGstChange(event: any) {
    this.invoice.gst = event.value;
    this.calcGrandTotal();
  }

  onDiscountChange(event: any) {
    this.invoice.discount = event.value;
    this.calcGrandTotal();
  }

  calcInvoice() {
    this.invoice.subTotal = this.invoice.services
      .map((service) => service.price)
      .reduce((total, cur) => (total += cur), 0);

    this.calcGrandTotal();
  }

  calcGrandTotal() {
    this.invoiceService.setGstandDiscount(this.invoice);
    this.invoice.grandTotal =
      this.invoice.subTotal + this.invoice.calcGst - this.invoice.calcDiscount;
  }

  onRemoveServiceClick(serviceId: number) {
    this.invoice.services = this.invoice.services.filter(
      (service) => service.id != serviceId
    );
    this.calcInvoice();
  }

  onCancelClick() {
    this.router.navigate([
      'list-invoices',
      {
        clientId: this.invoice.client.id,
      },
    ]);
  }

  onSaveClick() {
    this.invoiceService.saveInvoice(this.invoice).subscribe(
      (response) => {
        this.invoice = response;
        this.utilsService.showSuccessMessage('Saved Invoice Successfully');
        this.utilsService.redirectTo('/edit-invoice', 'id', this.invoice.id);
      },
      (error) => {
        console.log(error);
        this.utilsService.showErrorMessage('Error Saving Invoice');
      }
    );
  }
}
