import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon } from '@model/pokemon.model';

@Component({
  selector: 'app-pokemon-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-info.component.html',
  styles: `
    img {
      image-rendering: pixelated;
    }
  `
})
export class PokemonInfoComponent {
  @Input({required: true}) pokemon: Pokemon | null = null;
}
