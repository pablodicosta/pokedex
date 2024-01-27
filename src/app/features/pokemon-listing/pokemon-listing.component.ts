import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedListComponent } from '@components/paginated-list/paginated-list.component';
import { Pokemon } from '@model/pokemon.model';
import { PokeApiService } from '@services/poke-api/poke-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-listing',
  standalone: true,
  imports: [PaginatedListComponent, CommonModule],
  templateUrl: './pokemon-listing.component.html'
})
export class PokemonListingComponent implements OnInit {
  pageSize: number = 10;

  protected totalPages: number = 0;

  protected listItems: Observable<Pokemon>[] = [];
  
  constructor(private pokeApi: PokeApiService, protected router: Router) { }

  ngOnInit(): void {
    this.fetchPokemons({limit: 20});    
  }
  
  private fetchPokemons({limit, nextPage = false}:{limit?: number, nextPage?: boolean}) {
    this.pokeApi.fetchPokemons({limit, nextPage})
      .subscribe(response => {
        this.totalPages = Math.ceil(this.pokeApi.pokemonCount / this.pageSize);
        this.listItems.push(...response);
      });
  }

  protected lastPageHandler() {
    this.fetchPokemons({nextPage: true});    
  }
}
