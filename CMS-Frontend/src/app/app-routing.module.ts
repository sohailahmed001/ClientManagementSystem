import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { ListInvoicesComponent } from './components/list-invoices/list-invoices.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ClientResolveService } from './services/client-resolve.service';
import { InvoiceResolveService } from './services/invoice-resolve.service';

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
  {
    path: 'edit-client',
    component: EditClientComponent,
    resolve: {
      client: ClientResolveService,
    },
  },
  { path: 'list-services', component: ListServicesComponent },
  { path: 'list-invoices', component: ListInvoicesComponent },
  {
    path: 'edit-invoice',
    component: EditInvoiceComponent,
    resolve: {
      invoice: InvoiceResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
