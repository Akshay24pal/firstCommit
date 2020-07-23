import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent, AddOpenHouseComponent, HouseListComponent, ActiveComponent, AcceptedOfferComponent, SoldArchivedComponent,OpenHouseDetailsComponent } from './'
import { ViewProfileComponent } from './view-profile/view-profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'add-open-house',
        component: AddOpenHouseComponent,
      },
      {
        path: 'view-list',
        component: HouseListComponent,
        children: [
          { path: 'open-house-details', component: OpenHouseDetailsComponent }
         ]

      },
      {
        path: 'active',
        component: ActiveComponent,
      },
      {
        path: 'accepted-offer',
        component: AcceptedOfferComponent,
      },
      {
        path: 'sold-archived',
        component: SoldArchivedComponent,
      },
      {
        path: 'view-profile',
        component: ViewProfileComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'setting',
        loadChildren: () => import('./settings/settings.module')
          .then(m => m.SettingsModule),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
