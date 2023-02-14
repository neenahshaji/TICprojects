import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, LoginComponent } from './features';
import { CartComponent } from './features/cart/cart.component';
import { MyordersComponent } from './features/myorders/myorders.component';
import { MyprofileComponent } from './features/myprofile/myprofile.component';
import { VieworderComponent } from './features/vieworder/vieworder.component';
import { AuthGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent
      }
    ],
    canActivate: [AuthGuard]
  },

  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },

  {

    path: 'cart',

    pathMatch: 'full',

    component: CartComponent

  },
  {
    path: 'vieworder',
    pathMatch: 'full',
    component: VieworderComponent
  },

  {

    path: 'myprofile',

    pathMatch: 'full',

    component: MyprofileComponent

  },

  {

    path: 'myorders',

    pathMatch: 'full',

    component: MyordersComponent

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
