import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  twitter: string = '';
  facebook: string = 'https://www.facebook.com/skinopedia.lb?mibextid=ZbWKwL';
  instagram: string =
    'https://instagram.com/skinopedia.lb?igshid=NTc4MTIwNjQ2YQ==';
  linkedin: string = '';
  google_plus: string = '';
  upwork: string = '';
  tiktok: string =
    'https://www.tiktok.com/@serena.skinopedia?_t=8dPCmA1yVpy&_r=1';

  navigateToRoute(param: string) {
    window.scrollTo(0, 0);
    this.router.navigate([param]);
  }

  openDiscountDialog(): void {
    const dialogRef = this.dialog.open(TermsDialogComponent);
  }
}
