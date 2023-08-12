import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { ChechoutComponent } from '../shared/chechout/chechout.component';
import { SearchScreenComponent } from '../shared/search-screen/search-screen.component';
import { ItemScreenComponent } from '../shared/item-screen/item-screen.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full',
      },
      {
        path: 'Home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'Contact-us',
        loadChildren: () =>
          import('../contact-us/contact-us.module').then(
            (m) => m.ContactUsModule
          ),
      },
      {
        path: 'About-us',
        loadChildren: () =>
          import('../about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path:'cart',
        component:ChechoutComponent
      },
      {
        path:'search',
        component: SearchScreenComponent
      },
      {
        path:'product',
        component: ItemScreenComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class MainRoutingModule {}
