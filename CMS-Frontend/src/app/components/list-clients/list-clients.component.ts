import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css'],
})
export class ListClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe(
      (response) => {
        this.clients = response || [];
        console.log(response);
      },
      (error) => {}
    );
  }

  onEditClick(clientId: number) {
    this.router.navigate(['/edit-client', { id: clientId }]);
  }

  onDeleteClick(clientId: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this client?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        this.clientService.deleteClientById(clientId).subscribe(
          (response) => {
            this.getAllClients();
            this.utilsService.showSuccessMessage('Deleted Client Successfully');
          },
          (error) => {
            console.log(error);
            this.utilsService.showErrorMessage('Error Deleting Client');
          }
        );
      },
      reject: () => {
        //reject action
      },
    });
  }
}
