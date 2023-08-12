import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  constructor(private router: Router) {}
  @Input() dropName: string = 'DropDown';
  @Input() sections: any = [];

  navigateToRoute(param: string, _search: string | null = null) {
    window.scrollTo(0, 0);
    this.router.navigate(
      [param],
      _search ? { queryParams: { search: _search } } : {}
    );
  }
}
