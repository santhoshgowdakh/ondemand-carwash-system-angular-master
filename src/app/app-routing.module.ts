import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page-component/landing-page.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailComponent } from './order/order-detail.component';
import { OrderListComponent } from './order/order-list.component';
import { OrderComponent } from './order/order.component';
import { PlaceOrderComponent } from './order/place-order.component';
import { PlanListComponent } from './plan/plan-list.component';
import { CarComponent } from './car/car.component';
import { PromocodeListComponent } from './promocode/promocode-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './address/edit-address/edit-address.component';
import { PlanComponent } from './plan/plan.component';
import { CarDetailsComponent } from './car/car-details/car-details.component';

const routes: Routes = [
  // { path: 'home', component: LoginComponent },
  { path: 'order/:id', component: OrderDetailComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'place-order', component: PlaceOrderComponent },
  { path: 'login', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
  { path: 'plan-list', component: PlanListComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'promocode', component: PromocodeListComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'address', component: AddressComponent },
  { path: 'edit-address/:id', component: EditAddressComponent },
  { path: 'car', component: CarComponent },
  { path: 'mycars', component: CarComponent },
  { path: 'user', component: UserComponent },
  { path: 'create_user', component: CreateUserComponent },
  { path: 'viewdetail/:id', component: CarDetailsComponent },

  { path: 'landing-page', component: LandingPageComponent },
  { path: 'edit_user', component: EditUserComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'delete_user', component: DeleteUserComponent },
  { path: 'delete_user', component: DeleteUserComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
