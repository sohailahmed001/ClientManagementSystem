import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceModel } from 'src/app/models/service.model';
import { ServiceModelService } from 'src/app/services/service-model.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
})
export class EditServiceComponent implements OnInit {
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  display: boolean = true;
  title: string = 'Add Service';
  service: ServiceModel = new ServiceModel();

  constructor(
    private serviceModelService: ServiceModelService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    if (this.serviceModelService.editServiceDialogId) {
      this.title = 'Update Service';
      this.getServiceById(this.serviceModelService.editServiceDialogId);
      this.serviceModelService.editServiceDialogId = null;
    }
  }

  getServiceById(serviceId: number) {
    this.serviceModelService.getServiceById(serviceId).subscribe(
      (response: any) => {
        this.service = response;
      },
      (error) => {
        console.log(error);
        this.utilsService.showErrorMessage('Error Updating Service');
        this.closeDialog.emit(false);
      }
    );
  }

  onSaveClick() {
    this.serviceModelService.saveService(this.service).subscribe(
      (response: any) => {
        this.service = response;
        this.closeDialog.emit(true);
        this.utilsService.showSuccessMessage('Saved Service Successfully');
      },
      (error) => {
        console.log(error);
        this.utilsService.showErrorMessage('Error Saving Service');
      }
    );
  }

  onClearClick() {
    this.service.serviceName = null;
    this.service.description = null;
    this.service.price = null;
  }

  onHideDialog() {
    this.closeDialog.emit(false);
  }
}
