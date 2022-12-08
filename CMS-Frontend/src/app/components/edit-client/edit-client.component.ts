import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  client: Client = new Client();
  pageTitle: string = 'Add Client';

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.client = this.activatedRoute.snapshot.data['client'];

    this.pageTitle =
      this.client && this.client.id ? 'Update Client' : 'Add Client';
  }

  onFormSubmit(clientForm: NgForm) {
    console.log(this.client);

    this.clientService.saveClient(this.client).subscribe(
      (response) => {
        this.getClientById(response.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getClientById(id: number) {
    this.clientService.getClientById(id).subscribe(
      (response) => {
        this.client = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
