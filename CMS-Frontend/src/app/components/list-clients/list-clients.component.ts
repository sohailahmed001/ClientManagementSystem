import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css'],
})
export class ListClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

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
}
