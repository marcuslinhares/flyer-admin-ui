import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-product-item',
  standalone: true,
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  imports: [CurrencyPipe, CommonModule, CardModule, ButtonModule, BadgeModule]
})
export class ProductItemComponent {
  @Input() product!: Product;

  viewDetails() {
    console.log('Ver detalhes do produto', this.product);
  }

  get productImageUrl(): string {
    return this.product.imagem
      ? `https://api.flyer.marcuslinhares.ip-ddns.com/api/files/produtos/${this.product.id}/${this.product.imagem}`
      : 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg';
  }
}
