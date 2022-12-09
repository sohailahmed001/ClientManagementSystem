import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  client: Client = new Client();
  userOptions: any[] = [];
  pageTitle: string = 'Add Client';

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.client = this.activatedRoute.snapshot.data['client'];
    this.pageTitle =
      this.client && this.client.id ? 'Update Client' : 'Add Client';
  }

  onFormSubmit(clientForm: NgForm) {
    console.log(this.client);

    this.clientService.saveClient(this.prepareFormData(this.client)).subscribe(
      (response) => {
        console.log(response);
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

  searchUsers(event: any) {
    this.userService.getUsersContaining(event.query).subscribe(
      (response: any[]) => {
        this.userOptions = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  prepareFormData(client: Client): FormData {
    const formData = new FormData();

    formData.append(
      'client',
      new Blob([JSON.stringify(client)], { type: 'application/json' })
    );
    formData.append('imageFile', client.photoFile, client.photoFile.name);

    return formData;
  }

  onPhotoSelected(event: any, photoUpload: any) {
    console.log(event);
    if (event.currentFiles) {
      this.client.photoFile = event.currentFiles[0];
      const unsafeUrl =
        event.currentFiles[0].objectURL.changingThisBreaksApplicationSecurity;

      this.client.selectedImageUrl =
        this.sanitizer.bypassSecurityTrustUrl(unsafeUrl);

      console.log(this.client);
    }
  }

  hasRole(roles: any[]): boolean {
    return this.userService.roleMatch(roles);
  }

  onCancelClick() {
    if (this.hasRole(['Admin'])) {
      console.log('GOOO');
      this.router.navigate(['/list-clients']);
    }
  }

  onClearImageClick(photoUpload: any) {
    this.client.selectedImageUrl = null;
    photoUpload.clear();
  }
}
