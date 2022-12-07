import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'list-clients', component: ListClientsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
