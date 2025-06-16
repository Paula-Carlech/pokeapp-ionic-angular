import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favoritePokemons';

  // Subject to emit events when favorites change
  private favoritesChanged = new Subject<void>();

  // Public observable for components to subscribe and listen for changes
  favoritesChanged$ = this.favoritesChanged.asObservable();

  constructor() { }

  // Retrieve all favorite Pokémon IDs from localStorage
  getFavorites(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Check if a specific Pokémon ID is in favorites
  isFavorite(id: number | string): boolean {
    const favorites = this.getFavorites().map(favId => favId.toString());
    return favorites.includes(id.toString());
  }

  // Toggle favorite status: add if not present, remove if already favorite
  toggleFavorite(id: number | string): void {
    const favorites = this.getFavorites().map(favId => favId.toString());
    const idStr = id.toString();
    const index = favorites.indexOf(idStr);

    if (index > -1) {
      favorites.splice(index, 1); // Remove from favorites
    } else {
      favorites.push(idStr); // Add to favorites
    }

    // Save updated favorites back to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));

    // Emit event to notify subscribers that favorites changed
    this.favoritesChanged.next();
  }
}
