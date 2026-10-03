import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h1>Products</h1>
        <button class="btn btn-primary" (click)="openForm()">+ Add Product</button>
      </div>

      <!-- Form Modal -->
      <div class="card" *ngIf="showForm" style="margin-bottom: 20px; border: 1px solid var(--primary-color);">
        <h3>{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h3>
        <form (ngSubmit)="onSubmit()" #productForm="ngForm" style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" name="name" [(ngModel)]="currentProduct.name" required>
          </div>
          
          <div class="form-group">
            <label>SKU</label>
            <input type="text" class="form-control" name="sku" [(ngModel)]="currentProduct.sku" required>
          </div>
          
          <div class="form-group">
            <label>Category</label>
            <input type="text" class="form-control" name="category" [(ngModel)]="currentProduct.category" required>
          </div>
          
          <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" name="price" [(ngModel)]="currentProduct.price" required>
          </div>
          
          <div class="form-group">
            <label>Quantity</label>
            <input type="number" class="form-control" name="quantity" [(ngModel)]="currentProduct.quantity" required>
          </div>
          
          <div class="form-group">
            <label>Barcode</label>
            <input type="text" class="form-control" name="barcode" [(ngModel)]="currentProduct.barcode" required>
          </div>
          
          <div style="grid-column: span 2; display: flex; gap: 10px; justify-content: flex-end; margin-top: 10px;">
            <button type="button" class="btn btn-secondary" (click)="closeForm()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="!productForm.valid">Save Product</button>
          </div>
        </form>
      </div>

      <!-- Product Table -->
      <div class="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Barcode</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of products">
              <td>{{ p.name }}</td>
              <td>{{ p.sku }}</td>
              <td>{{ p.category }}</td>
              <td>$\{{ p.price }}</td>
              <td>{{ p.quantity }}</td>
              <td>{{ p.barcode }}</td>
              <td>
                <span class="badge" [ngClass]="getStatusClass(p.quantity)">
                  {{ getStatusText(p.quantity) }}
                </span>
              </td>
              <td style="display: flex; gap: 8px;">
                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 12px;" (click)="editProduct(p)">Edit</button>
                <button class="btn btn-danger" style="padding: 4px 8px; font-size: 12px;" (click)="deleteProduct(p.id!)">Delete</button>
              </td>
            </tr>
            <tr *ngIf="products.length === 0">
              <td colspan="8" style="text-align: center; color: var(--text-light); padding: 20px;">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  showForm = false;
  isEditing = false;
  
  currentProduct: Product = this.getEmptyProduct();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Failed to load products', err)
    });
  }

  openForm() {
    this.isEditing = false;
    this.currentProduct = this.getEmptyProduct();
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.currentProduct = { ...product };
    this.showForm = true;
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }

  onSubmit() {
    if (this.isEditing && this.currentProduct.id) {
      this.productService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      this.productService.createProduct(this.currentProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: (err) => console.error('Create failed', err)
      });
    }
  }

  getStatusClass(quantity: number): string {
    if (quantity === 0) return 'badge-danger';
    if (quantity <= 10) return 'badge-warning';
    return 'badge-success';
  }

  getStatusText(quantity: number): string {
    if (quantity === 0) return 'OUT OF STOCK';
    if (quantity <= 10) return 'LOW STOCK';
    return 'IN STOCK';
  }

  getEmptyProduct(): Product {
    return { name: '', sku: '', category: '', price: 0, quantity: 0, barcode: '' };
  }
}
