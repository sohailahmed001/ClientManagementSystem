import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { ClientService } from 'src/app/services/client.service';
import { InvoiceService } from 'src/app/services/invoice.service';
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
  readOnly: boolean = false;

  constructor(
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private utilsService: UtilsService,
    private router: Router
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

  onGstChange(event: any) {
    this.invoice.gst = event.value;
    this.calcGrandTotal();
  }

  onDiscountChange(event: any) {
    this.invoice.discount = event.value;
    this.calcGrandTotal();
  }

  calcGrandTotal() {
    this.invoiceService.setGstandDiscount(this.invoice);
    this.invoice.grandTotal =
      this.invoice.subTotal + this.invoice.calcGst - this.invoice.calcDiscount;
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
      },
      (error) => {
        console.log(error);
        this.utilsService.showErrorMessage('Error Saving Invoice');
      }
    );
  }
}
