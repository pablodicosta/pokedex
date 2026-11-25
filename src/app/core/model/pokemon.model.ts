import { Observable } from 'rxjs';

export interface Pokemon {
  id?: number;
  types?: string[];
  name: string;
  imageUrl: string;
  abilities: Observable<string | undefined>[];
  evolutions: Observable<Observable<Pokemon>[]>;
}
