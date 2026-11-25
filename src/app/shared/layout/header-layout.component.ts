import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="frame header-inner">
      <a class="brand" routerLink="/pokemon-listing" aria-label="Pokédex home">
        <span class="brand-icon" aria-hidden="true"></span>
        Pokédex<span class="brand-period" aria-hidden="true">.</span>
      </a>
      <span class="header-label"><span aria-hidden="true"></span> Trainer’s field guide</span>
    </div>
  `
})
export class HeaderLayoutComponent { }
