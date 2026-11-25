import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '@model/pokemon.model';
import { find } from 'lodash-es';
import { catchError, map, mergeMap, Observable, of, shareReplay, tap } from 'rxjs';

import { ConfigService } from '../config.service';
import {
  FetchAbilityResponse,
  FetchEvolutionChainResponse,
  FetchPokemonDetailsResponse,
  FetchPokemonSpecieResponse,
  FetchPokemonsResponse
} from './poke-api.types';
import { findEvolutionsInChain, getEvolutionNames } from './poke-api.utils';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private getPokemonsNextUrl: string = '';
  
  pokemonCount: number = 0;

  constructor(private config: ConfigService, private http: HttpClient) { }
  
  fetchPokemons({limit, nextPage = false}: {limit?: number; nextPage?: boolean}): Observable<Observable<Pokemon>[]> {
    const url = nextPage ? this.getPokemonsNextUrl : `${this.config.pokeApiUrl}/pokemon?limit=${limit}`;
    
    return this.http.get<FetchPokemonsResponse>(url)
      .pipe(
        tap(response => {
          this.pokemonCount = response.count;
          this.getPokemonsNextUrl = response.next;
        }),
        map(response => response.results.map(result => this.fetchPokemonDetails(result.name).pipe(
          catchError(() => of({ name: result.name, imageUrl: '', abilities: [], evolutions: of([]) }))
        ))),
        shareReplay()
      );
  }
    
  fetchPokemonDetails(name: string): Observable<Pokemon> {
    return this.http.get<FetchPokemonDetailsResponse>(`${this.config.pokeApiUrl}/pokemon/${name}`)
      .pipe(
        map(response => ({
          id: response.id,
          name: response.name,
          imageUrl: response.sprites.other?.['official-artwork']?.front_default ?? response.sprites.front_default ?? '',
          types: response.types.map(entry => entry.type.name),
          abilities: response.abilities.map(abilityItem => this.fetchAbility(abilityItem.ability.name)),
          evolutions: this.fetchEvolutions(name, response.species.name)
        } as Pokemon)),
        shareReplay()
      );
  }
      
  private fetchAbility(name: string, locale: string = 'en'): Observable<string | undefined> {
    return this.http.get<FetchAbilityResponse>(`${this.config.pokeApiUrl}/ability/${name}`)
      .pipe(
        map(response => find(response.names, item => item.language.name === locale)?.name ?? name),
        catchError(() => of(name)),
        shareReplay()
      );
  }
  
  private fetchPokemonSpecie(name: string): Observable<FetchPokemonSpecieResponse> {
    return this.http.get<FetchPokemonSpecieResponse>(`${this.config.pokeApiUrl}/pokemon-species/${name}`);
  }

  private fetchEvolutions(name: string, specieName: string): Observable<Observable<Pokemon>[]> {
    return this.fetchPokemonSpecie(specieName).pipe(
      mergeMap(specie => this.http.get<FetchEvolutionChainResponse>(specie.evolution_chain.url)),
      mergeMap(response => of(findEvolutionsInChain(name, response.chain))),
      map(evolutionChain => getEvolutionNames(evolutionChain)),
      map(evolutionNames => evolutionNames.map(evolutionName => this.fetchPokemonDetails(evolutionName).pipe(
        catchError(() => of({ name: evolutionName, imageUrl: '', abilities: [], evolutions: of([]) }))
      ))),
      shareReplay()
    );
  }
}
