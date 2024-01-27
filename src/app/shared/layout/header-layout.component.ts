import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [],
  template: `
    <div class="flex justify-center cursor-pointer" (click)="router.navigate(['pokemon-listing'])">
      <img src="assets/logo.png" alt="Logo">
    </div>
  `
})
export class HeaderLayoutComponent {
  constructor (protected router: Router) { }
}
