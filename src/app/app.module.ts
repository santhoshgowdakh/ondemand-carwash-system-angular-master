import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { PromocodeComponent } from './promocode/promocode.component';
import { PlanComponent } from './plan/plan.component';
import { OrderComponent } from './order/order.component';
import { PromocodeListComponent } from './promocode/promocode-list.component';
import { PlanListComponent } from './plan/plan-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { OrderDetailComponent } from './order/order-detail.component';
import { OrderListComponent } from './order/order-list.component';
import { LandingPageComponent } from './landing-page-component/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PlaceOrderComponent } from './order/place-order.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

import { CreateCarComponent } from './car/create-car/create-car.component';
import { EditCarComponent } from './car/edit-car/edit-car.component';
import { ProfileComponent } from './profile/profile.component';
import { CarComponent } from './car/car.component';
//import { IgxDropDownModule } from 'igniteui-angular';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './address/edit-address/edit-address.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { AddPlanComponent } from './plan/add-plan/add-plan.component';
import { EditPlanComponent } from './plan/edit-plan/edit-plan.component';
import { AddPromocodeComponent } from './promocode/add-promocode/add-promocode.component';
import { EditPromocodeComponent } from './promocode/edit-promocode/edit-promocode.component';
import { CarDetailsComponent } from './car/car-details/car-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CarComponent,
    PromocodeComponent,
    PlanComponent,
    OrderComponent,
    PromocodeListComponent,
    PlanListComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    OrderDetailComponent,
    OrderListComponent,
    LandingPageComponent,
    LoginComponent,
    PlaceOrderComponent,
    HomeComponent,
    NotFoundComponent,
    EditCarComponent,
    CreateCarComponent,
    CarDetailsComponent,
    EditCarComponent,
    ProfileComponent,
    AddressComponent,
    EditAddressComponent,
    AddAddressComponent,
    AddPlanComponent,
    EditPlanComponent,
    AddPromocodeComponent,
    EditPromocodeComponent,
    CarDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    //IgxDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
