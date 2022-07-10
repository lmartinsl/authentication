import { Observable } from 'rxjs';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products$: Observable<Product[]>;

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.products$ = this.mainService.getProducts();
  }

}
