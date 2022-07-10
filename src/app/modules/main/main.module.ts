import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PeopleComponent } from './components/people/people.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [PeopleComponent, ProductsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class MainModule { }
