import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.userAuthService.isLoggedIn();
  }

  onLogoutClick() {
    this.userAuthService.clear();
    this.router.navigate(['home']);
  }

  hasRoles(roles: any[]): boolean {
    return this.userService.roleMatch(roles);
  }

  onAddClientClick() {
    this.utilsService.redirectTo('/edit-client');
  }

  onGenerateInvoiceClick() {
    this.utilsService.redirectTo('/edit-invoice');
  }
}
