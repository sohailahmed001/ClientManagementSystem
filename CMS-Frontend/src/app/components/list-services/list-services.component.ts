import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ServiceModelService } from 'src/app/services/service-model.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css'],
})
export class ListServicesComponent implements OnInit {
  servicesList: any[] = [];
  showEditServiceDialog = false;

  constructor(
    private serviceModelService: ServiceModelService,
    private utilsService: UtilsService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
    this.serviceModelService.getAllServices().subscribe(
      (response: any[]) => {
        this.servicesList = response;
      },
      (error) => {
        this.utilsService.showErrorMessage('Error getting services');
        console.log(error);
      }
    );
  }

  onCloseDialog(event: any) {
    this.showEditServiceDialog = false;
    if (event) {
      this.getAllServices();
    }
  }

  onEditClick(serviceId: number) {
    this.serviceModelService.editServiceDialogId = serviceId;
    this.showEditServiceDialog = true;
  }

  onDeleteClick(serviceId: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this service?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        this.serviceModelService.deleteServiceById(serviceId).subscribe(
          (response) => {
            this.getAllServices();
            this.utilsService.showSuccessMessage(
              'Deleted Service Successfully'
            );
          },
          (error) => {
            console.log(error);
            this.utilsService.showErrorMessage('Error Deleting Service');
          }
        );
      },
      reject: () => {
        //reject action
      },
    });
  }
}
