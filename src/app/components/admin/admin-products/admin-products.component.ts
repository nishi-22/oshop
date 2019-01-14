import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product/product.service';
import {ProductDetail} from '../../../models/product-detail';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: ProductDetail[];
  filteredProducts: any[];

  public rowsOnPage = 5;
//  public sortOrder = "asc";

  constructor(private productService: ProductService) {
   productService.getAll().subscribe(products => this.filteredProducts = this.products = products );
  }

  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }


  ngOnInit() {
  }

}
