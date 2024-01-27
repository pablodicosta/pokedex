import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  pokeApiUrl: string;

  constructor() {
    this.pokeApiUrl = environment.pokeApiUrl;
  }
}
