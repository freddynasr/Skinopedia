import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';
// import { AboutUsModule } from '../about-us/about-us.module';
// import { ContactUsModule } from '../contact-us/contact-us.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    HomeModule,
    // AboutUsModule,
    // ContactUsModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
