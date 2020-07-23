import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent, ResetPasswordComponent, ChangePasswordComponent, CreateAgentProfileComponent, RegisterComponent, VisitorComponent } from './';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'change-password/:userId',
        component: ChangePasswordComponent,
      },
      {
        path: 'create-agent-profile',
        component: CreateAgentProfileComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'visitor/:uniqueHouseKey',
        component: VisitorComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
