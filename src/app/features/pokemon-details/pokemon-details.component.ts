import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginatedListComponent } from '@components/paginated-list/paginated-list.component';
import { Pokemon } from '@model/pokemon.model';
import { PokeApiService } from '@services/poke-api/poke-api.service';
import { capitalize } from 'lodash-es';
import { catchError, map, Observable, of, startWith, switchMap, tap } from 'rxjs';

import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [PokemonInfoComponent, PaginatedListComponent, CommonModule, RouterLink],
  templateUrl: './pokemon-details.component.html'
})
export class PokemonDetailsComponent implements OnInit {

  protected pokemon: Observable<{
    info: Pokemon;
    evolutions: Observable<Observable<Pokemon>[] | 'error'>;
  } | 'loading' | 'error'> = new Observable();

  constructor(private pokeApi: PokeApiService, protected router: Router, 
    private activatedRoute: ActivatedRoute, private title: Title) { }
  
  ngOnInit(): void {
    this.pokemon = this.activatedRoute.paramMap.pipe(
      map(params => params.get('name')!.toLowerCase()),
      switchMap(name => this.pokeApi.fetchPokemonDetails(name).pipe(
        tap(pokemon => this.title.setTitle(`${capitalize(pokemon.name)} - Pokédex`)),
        map(info => ({
          info,
          evolutions: info.evolutions.pipe(catchError(() => of('error' as const)))
        })),
        catchError(() => of('error' as const)),
        startWith('loading' as const)
      ))
    );
  }
}
