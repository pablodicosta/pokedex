import { Observable } from 'rxjs';

export interface Pokemon {
  name: string;
  imageUrl: string;
  abilities: Observable<string | undefined>[];
  evolutions: Observable<Observable<Pokemon>[]>;
}