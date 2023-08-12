import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PreviousRouteService } from '../services/previous-route.service';
import { ApiCallsService } from '../services/api-calls.service';
import { Product } from '../services/product-module';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  public KeyUp = new Subject<KeyboardEvent>();
  private subscription: Subscription | null = null;
  private Products: Product[]=[]
  constructor(private router: Router , private previousRoute: PreviousRouteService , private apiCaller: ApiCallsService) {}

  search:string=''
  ngOnInit(): void {
    this.subscription = this.KeyUp.pipe(
      map((event: any) => event?.target?.value),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(search => {
      this.apiCaller.offset = 0;
      if (search != '') {
        this.apiCaller.searchIds = [];
        this.apiCaller.searchResult = [];
        this.apiCaller.getSearch(search, (data: any) => {
          this.Products = data;
          this.navigateToRoute('search', search)});
      }
      else{
        this.rest()
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navigateToRoute(param: string, _search:string | null= null) {
    window.scrollTo(0, 0);
    this.router.navigate([param], (_search ? {queryParams: {search : _search}}: {}));
  }

  rest(): void {
    this.navigateToRoute('Home', null);
    this.search = '';

    const fakeEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    Object.defineProperty(fakeEvent, 'target', { value: { value: this.search }, writable: true });

    this.KeyUp.next(fakeEvent);
  }

}
