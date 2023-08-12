import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/services/product-module';
import { AdminApiCallerService } from 'src/app/shared/services/admin-api-caller.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  AllProducts: Product[] = [];
  Types: string[] = [];
  constructor(
    private apiCaller: AdminApiCallerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiCaller.Products = [];
    this.apiCaller.getAdminProducts((data: any) => {
      this.AllProducts = data;
    });
  }

  navigateToRoute(route: string) {
    window.scrollTo(0, 0);
    this.router.navigate([route]);
  }

  editProduct(id: string) {
    this.router.navigate(['admin/dashboard/Product'], {
      queryParams: { id: id },
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiCaller.removeProduct(id, (data: any) => {
        this.AllProducts = [];
        this.apiCaller.ProductOffset = 0;
        this.apiCaller.Products = [];
        this.apiCaller.getAdminProducts((data: any) => {
          this.AllProducts = data;
        });
      });
    }
  }

  loadMore() {
    this.apiCaller.ProductOffset += 12;
    this.apiCaller.getAdminProducts((data: any) => {
      this.AllProducts = data;
    });
  }
}
