import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Dashboard</h1>
      
      <div class="dashboard-cards" style="display: flex; gap: 20px; margin-top: 20px;">
        <div class="card" style="flex: 1;">
          <h3>Total Products</h3>
          <h2 style="font-size: 32px; color: var(--primary-color); margin-top: 10px;">{{ totalProducts }}</h2>
        </div>
        
        <div class="card" style="flex: 1;">
          <h3>Total Stock</h3>
          <h2 style="font-size: 32px; color: var(--success); margin-top: 10px;">{{ totalStock }}</h2>
        </div>
        
        <div class="card" style="flex: 1;">
          <h3>Low Stock Items</h3>
          <h2 style="font-size: 32px; color: var(--danger); margin-top: 10px;">{{ lowStockCount }}</h2>
        </div>
      </div>

      <div class="card" style="margin-top: 30px;">
        <h3>Low Stock Products</h3>
        <table *ngIf="lowStockProducts.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of lowStockProducts">
              <td>{{ p.name }}</td>
              <td>{{ p.sku }}</td>
              <td>{{ p.quantity }}</td>
              <td>
                <span class="badge" [ngClass]="{'badge-danger': p.quantity === 0, 'badge-warning': p.quantity > 0}">
                  {{ p.quantity === 0 ? 'OUT OF STOCK' : 'LOW STOCK' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="lowStockProducts.length === 0" style="margin-top: 15px; color: var(--text-light);">No low stock products.</p>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  totalProducts = 0;
  totalStock = 0;
  lowStockCount = 0;
  lowStockProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.totalProducts = data.length;
        this.totalStock = data.reduce((acc, p) => acc + p.quantity, 0);
        this.lowStockProducts = data.filter(p => p.quantity <= 10);
        this.lowStockCount = this.lowStockProducts.length;
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }
}
