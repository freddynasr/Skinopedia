import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { CardItemComponent } from './card-item/card-item.component';
import { ChatComponent } from './chat/chat.component';
import { ItemScreenComponent } from './item-screen/item-screen.component';
import { CartScreenComponent } from './cart-screen/cart-screen.component';
import { ChechoutComponent } from './chechout/chechout.component';
import { FooterComponent } from './footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchScreenComponent } from './search-screen/search-screen.component';
import { MatRadioModule } from '@angular/material/radio';

import { GoogleMapComponent } from './google-map/google-map.component';
import { GoogleMapsModule } from '@angular/google-maps';

import { TermsDialogComponent } from './terms-dialog/terms-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DiscountDialogComponent } from './discount-dialog/discount-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OfferScreenComponent } from './offer-screen/offer-screen.component';
import { SpinnerComponent } from './spinner/spinner.component';

const components = [
  NavBarComponent,
  CardItemComponent,
  ChatComponent,
  ItemScreenComponent,
  CartScreenComponent,
  ChechoutComponent,
  FooterComponent,
  SearchBarComponent,
  SearchScreenComponent,
  GoogleMapComponent,
  TermsDialogComponent,
  DiscountDialogComponent,
  PageNotFoundComponent,
  OfferScreenComponent,
  SpinnerComponent,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  providers: [],
  exports: [components, MatCheckboxModule],
})
export class SharedModule {}
