import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product-module';
import { ApiCallsService } from '../services/api-calls.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css'],
})
export class SearchScreenComponent implements OnInit {
  constructor(
    public apiCaller: ApiCallsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  search: string = '';
  Products: Product[] = [];
  searchParam: string = '';

  ngOnInit(): void {
    if (this.apiCaller.searchResult.length === 0) {
      this.route.queryParams.subscribe((params: any) => {
        this.searchParam = params['search'];
        this.apiCaller.getSearch(this.searchParam, (data: any) => {
          this.Products = data;
        });
      });
    }
  }
  loadMore(): void {
    this.apiCaller.getSearch(this.searchParam, (data: any) => {
      this.Products = data;
    });
  }
}
