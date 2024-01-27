import { Routes } from '@angular/router';
import { PokemonDetailsComponent } from '@features/pokemon-details/pokemon-details.component';
import { PokemonListingComponent } from '@features/pokemon-listing/pokemon-listing.component';

export const routes: Routes = [
  {
    path: 'pokemon-listing',
    title: 'Listing - Pokédex',
    component: PokemonListingComponent
  },
  {
    path: 'pokemon-details/:name',
    component: PokemonDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'pokemon-listing',
    pathMatch: 'full'
  }
];
