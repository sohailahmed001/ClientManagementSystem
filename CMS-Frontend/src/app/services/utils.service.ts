import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private messageService: MessageService, private router: Router) {}

  showSuccessMessage(summary: string, details: string = '') {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: details,
    });
  }

  showErrorMessage(summary: string, details: string = '') {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: details,
      life: 0,
    });
  }

  redirectTo(uri: string, routeParamName?: string, paramId?: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      if (routeParamName && paramId) {
        this.router.navigate([uri, { [routeParamName]: paramId }]);
      } else {
        this.router.navigate([uri]);
      }
    });
  }
}
