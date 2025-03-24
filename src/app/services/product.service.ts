import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Product, ProductCreate } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private pb = new PocketBase('https://api.flyer.marcuslinhares.ip-ddns.com');

  constructor() {}

  async getProducts(): Promise<Product[]> {
    return await this.pb.collection('produtos').getFullList({ sort: '-created' });
  }

  async getProductById(id: string): Promise<Product> {
    return await this.pb.collection('produtos').getOne(id);
  }

  async createProduct(product: FormData): Promise<Product> {
    return await this.pb.collection('produtos').create(product);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return await this.pb.collection('produtos').update(id, product);
  }
}
