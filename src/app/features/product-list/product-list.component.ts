import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      this.products = await this.productService.getProducts();
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      this.loading = false;
    }
  }
}
