import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterLayoutComponent } from '@layout/footer-layout.component';
import { HeaderLayoutComponent } from '@layout/header-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderLayoutComponent, FooterLayoutComponent],
  templateUrl: './app.component.html',
  styles: `
    :host {
      display: flex;
      justify-content: center;
      flex-grow: 1;
    }
  `
})
export class AppComponent {
}
