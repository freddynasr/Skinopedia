import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  windowScrolled: boolean = false;

  openNavbar: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeLink = this.router.url.substring(1);
    console.log(this.activeLink);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  toggleNavbar(): void {
    this.openNavbar = !this.openNavbar;
  }

  toggleNavbar2(): void {
    this.openNavbar = false;
  }

  activeLink: string = 'Home';

  navigateToRoute(param: string) {
    this.activeLink = param;
    window.scrollTo(0, 0);
    this.toggleNavbar2();
    this.router.navigate([param]);
  }
}
