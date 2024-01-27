import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-layout',
  standalone: true,
  imports: [],
  template: `
    <div class="flex justify-center text-3xl">
      Made with data from Pok&eacute;API
      (<a href="https://pokeapi.co/" target="_blank" class="mx-1 text-purple-900">https://pokeapi.co/</a>)
    </div>
  `
})
export class FooterLayoutComponent { }
