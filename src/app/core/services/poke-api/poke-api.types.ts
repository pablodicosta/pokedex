export type FetchPokemonsResponse = {
  count: number;
  next: string;
  results: {
    name: string;
    url: string;
  }[];
}

export type FetchPokemonDetailsResponse = {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: [{
    ability: {
      name: string;
    }
  }];
  species: {
    name: string;
  }
}

export type FetchAbilityResponse = {
  name: string;
  names: [{
    name: string;
    language: {
      name: string;
    }
  }];
}

export type FetchPokemonSpecieResponse = {
  name: string;
  evolution_chain: {
    url: string;
  }
}

export type FetchEvolutionChainResponse = {
  chain: ChainLink;
}

export type ChainLink = {
  species: {
    name: string;
  },
  evolves_to: ChainLink[]
}
