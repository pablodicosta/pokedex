import { ChainLink } from './poke-api.types';

/**
 * Traverse the evolution chain recursively to find the specified Pokemon and returns its evolutions.
 * @param name the Pokemon name to find in the chain.
 * @param root the root node of the evolution chain.
 * @returns the evolution tree of the given Pokemon or null if the Pokemon was not found.
 */
export function findEvolutionsInChain(name: string, root: ChainLink): ChainLink[] | null {
  if (root.species.name === name) return root.evolves_to;
  for (const item of root.evolves_to) {
    const chain = findEvolutionsInChain(name, item);
    if (chain !== null) return chain;
  }
  return null;
}

/**
 * Gets a list of the names of the evolutions of a given chain.
 * @param chain the evolution chain to get the names from.
 * @returns an array of the evolution names or an empty array if there are no evolutions.
 */
export function getEvolutionNames(chain: ChainLink[] | null): string[] {
  return chain
    ? chain.flatMap(item => ([item.species.name, ...getEvolutionNames(item.evolves_to)])) 
    : [];
}