import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedListComponent } from '@components/paginated-list/paginated-list.component';
import { Pokemon } from '@model/pokemon.model';
import { PokeApiService } from '@services/poke-api/poke-api.service';
import { capitalize } from 'lodash-es';
import { Observable } from 'rxjs';

import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [PokemonInfoComponent, PaginatedListComponent, CommonModule],
  templateUrl: './pokemon-details.component.html'
})
export class PokemonDetailsComponent implements OnInit {

  protected pokemon: Observable<Pokemon> = new Observable();

  protected evolutions: Observable<Observable<Pokemon>[]> = new Observable();

  constructor(private pokeApi: PokeApiService, protected router: Router, 
    private activatedRoute: ActivatedRoute, private title: Title) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pokemon = this.pokeApi.fetchPokemonDetails(params.get('name')!.toLowerCase());
      this.pokemon.subscribe(pokemon => {
        this.title.setTitle(`${capitalize(pokemon.name)} - Pokédex`);
      }); 
    });
  }
}