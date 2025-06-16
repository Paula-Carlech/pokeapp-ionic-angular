import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.page.html',
  imports: [IonicModule, CommonModule, RouterModule],
})
export class FavoritesPage implements OnInit {
  favoritePokemons: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.loadFavorites();
  }

  unfavorite(pokemon: any) {
    this.favoritesService.toggleFavorite(pokemon.id);
    // Remove the unfavorited Pokémon from the displayed list
    this.favoritePokemons = this.favoritePokemons.filter(p => p.id !== pokemon.id);
  }

  loadFavorites() {
    const favoritesIds = this.favoritesService.getFavorites();

    this.favoritePokemons = [];

    favoritesIds.forEach(id => {
      this.pokemonService.getPokemonDetails(id).subscribe(pokemon => {
        this.favoritePokemons.push({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        });
      });
    });
  }
}
