import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { ChatsComponent } from './chats/chats.component';
import { OffersComponent } from './offers/offers.component';
import { DiscountCodeComponent } from './discount-code/discount-code.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { SharedModule } from '../shared/shared.module';
import { EditAddcomponantComponent } from './edit-addcomponant/edit-addcomponant.component';
import { EditAddOfferComponent } from './edit-add-offer/edit-add-offer.component';
import { TypeSubtypeComponent } from './type-subtype/type-subtype.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    OrderComponent,
    ChatsComponent,
    OffersComponent,
    DiscountCodeComponent,
    SlideShowComponent,
    ManageProductsComponent,
    EditAddcomponantComponent,
    EditAddOfferComponent,
    TypeSubtypeComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ]
})
export class AdminModule { }
