import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit, OnDestroy {
  pokemons: any[] = [];
  offset = 0;

  private favoritesSub?: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPokemons();

    // Subscribe to favorites changes and update pokemons accordingly
    this.favoritesSub = this.favoritesService.favoritesChanged$.subscribe(() => {
      // Update the isFavorite property for all pokemons in the list
      this.pokemons = this.pokemons.map(pokemon => ({
        ...pokemon,
        isFavorite: this.favoritesService.isFavorite(pokemon.id)
      }));
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.favoritesSub?.unsubscribe();
  }

  // Load Pokémon with pagination and check if favorite
  loadPokemons() {
    this.pokemonService.getPokemons(20, this.offset).subscribe((data) => {
      const newPokemons = data.results.map((p: any) => {
        const id = p.url.split('/')[6];
        return {
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          id: id,
          isFavorite: this.favoritesService.isFavorite(id),
        };
      });
      this.pokemons = [...this.pokemons, ...newPokemons];
    });
  }

  loadMore() {
    this.offset += 20;
    this.loadPokemons();
  }

  // Toggle favorite status of a pokemon
  toggleFavorite(pokemon: any) {
    this.favoritesService.toggleFavorite(pokemon.id);
    pokemon.isFavorite = !pokemon.isFavorite;
  }

  // Navigate to details page
  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
}
