import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container">
      <nav class="sidebar">
        <h2>StockSmart</h2>
        <ul class="nav-links">
          <li>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          </li>
          <li>
            <a routerLink="/products" routerLinkActive="active">Products</a>
          </li>
        </ul>
      </nav>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  title = 'stocksmart-frontend';
}
