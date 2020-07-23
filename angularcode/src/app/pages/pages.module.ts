import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FooterComponent, HeaderComponent } from '../shared';
import { DashboardComponent, AddOpenHouseComponent, HouseListComponent, ActiveComponent, SoldArchivedComponent, AcceptedOfferComponent,OpenHouseDetailsComponent } from './';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
// Import library module
import { NgxSummernoteModule } from 'ngx-summernote';

import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    PagesComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    AddOpenHouseComponent,
    HouseListComponent,
    ActiveComponent,
    SoldArchivedComponent,
    AcceptedOfferComponent,
    ViewProfileComponent,
    EditProfileComponent,
    OpenHouseDetailsComponent
  ],
  exports:[FooterComponent,HeaderComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgxSpinnerModule,
    NgxSummernoteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class PagesModule { }
