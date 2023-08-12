import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public showMenu: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activeLink = this.router.url.substring(1);
    console.log(this.activeLink);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  activeLink: string = 'admin/dashboard/';

  navigateToRoute(param: string) {
    this.activeLink = param;
    window.scrollTo(0, 0);
    this.router.navigate([param]);
    this.toggleMenu();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['admin']);
  }
}
