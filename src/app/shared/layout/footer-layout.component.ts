import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-layout',
  standalone: true,
  imports: [],
  template: `
    <div class="frame footer-inner">
      <span>Pokédex <span aria-hidden="true">·</span> Trainer’s field guide</span>
      <a href="https://pokeapi.co/">Pokémon data from PokéAPI <span aria-hidden="true">↗</span></a>
    </div>
  `
})
export class FooterLayoutComponent { }
