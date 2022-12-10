import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private messageService: MessageService) {}

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
}
