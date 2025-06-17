import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  // Get paginated list of Pokémon
  getPokemons(limit: number, offset: number) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  // Get details of a single Pokémon
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`);
  }

  // Fetches Pokémon data by name from the API
  getPokemonByName(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

}
