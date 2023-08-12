import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { OffersComponent } from './offers/offers.component';
import { ChatsComponent } from './chats/chats.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { DiscountCodeComponent } from './discount-code/discount-code.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditAddcomponantComponent } from './edit-addcomponant/edit-addcomponant.component';
import { EditAddOfferComponent } from './edit-add-offer/edit-add-offer.component';
import { TypeSubtypeComponent } from './type-subtype/type-subtype.component';
import { SettingsComponent } from './settings/settings.component';
import { authGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            redirectTo: 'Orders',
            pathMatch: 'full',
          },
          {
            path: 'Orders',
            component: OrderComponent,
          },
          {
            path: 'Offers',
            component: OffersComponent,
          },
          {
            path: 'ManageProducts',
            component: ManageProductsComponent,
          },
          {
            path: 'Chats',
            component: ChatsComponent,
          },
          {
            path: 'SlideShow',
            component: SlideShowComponent,
          },
          {
            path: 'DiscountCodes',
            component: DiscountCodeComponent,
          },
          {
            path: 'Product',
            component: EditAddcomponantComponent,
          },
          {
            path: 'offer',
            component: EditAddOfferComponent,
          },
          {
            path: 'typeAndSubtype',
            component: TypeSubtypeComponent,
          },
          {
            path: 'settings',
            component: SettingsComponent,
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
