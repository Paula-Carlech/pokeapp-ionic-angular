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
  filteredPokemons: any[] = []; // Array to hold filtered results

  currentPage = 0; // Current page index (zero-based)
  limit = 10; // Number of pokemons per page
  totalPages = 0; // Total number of pages

  private favoritesSub?: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router
  ) { }

  currentYear = new Date().getFullYear(); // Current year for footer display

  ngOnInit() {
    // Load total Pokémon count first to calculate total pages,
    // then load the first page of Pokémons
    this.loadTotalCount();

    // Subscribe to favorites changes and update UI accordingly,
    // updating both pokemons and filteredPokemons arrays
    this.favoritesSub = this.favoritesService.favoritesChanged$.subscribe(() => {
      this.pokemons = this.pokemons.map(pokemon => ({
        ...pokemon,
        isFavorite: this.favoritesService.isFavorite(pokemon.id),
      }));
      // Update filteredPokemons to keep filtered list synced
      this.filteredPokemons = [...this.pokemons];
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.favoritesSub?.unsubscribe();
  }

  // Load total count of Pokémons to calculate total pages
  loadTotalCount() {
    this.pokemonService.getPokemons(1, 0).subscribe((data) => {
      this.totalPages = Math.ceil(data.count / this.limit);
      // Load the first page only after totalPages is set
      this.loadPokemons();
    });
  }

  // Load pokémons of the current page based on pagination
  loadPokemons() {
    const offset = this.currentPage * this.limit;

    this.pokemonService.getPokemons(this.limit, offset).subscribe((data) => {
      this.pokemons = data.results.map((p: any) => {
        const id = p.url.split('/')[6];
        return {
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          id: id,
          isFavorite: this.favoritesService.isFavorite(id),
        };
      });

      // Initialize filteredPokemons with full list on each load
      this.filteredPokemons = [...this.pokemons];
    });
  }

  // Filter pokemons by name via API
  filterPokemons(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (!searchTerm) {
      // If search is empty, load current paginated list
      this.loadPokemons();
      return;
    }

    // Call API to fetch a Pokémon by name
    this.pokemonService.getPokemonByName(searchTerm).subscribe(
      (pokemon: any) => {
        const id = pokemon.id;
        this.filteredPokemons = [{
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          id: id,
          isFavorite: this.favoritesService.isFavorite(id),
        }];
      },
      (error) => {
        // If Pokémon not found, show empty list
        this.filteredPokemons = [];
      }
    );
  }

  // Go to the next page if it exists
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadPokemons();
    }
  }

  // Go to the previous page if currentPage > 0
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPokemons();
    }
  }

  // Returns a list of page numbers to display (dynamic window)
  getPages(): number[] {
    const total = this.totalPages;
    const maxVisible = 5; // Maximum number of page buttons shown
    const half = Math.floor(maxVisible / 2);

    let start = this.currentPage - half;
    let end = this.currentPage + half;

    // Adjust bounds to avoid out-of-range pages
    if (start < 0) {
      start = 0;
      end = Math.min(maxVisible - 1, total - 1);
    }

    if (end >= total) {
      end = total - 1;
      start = Math.max(end - (maxVisible - 1), 0);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Go directly to a selected page
  goToPage(page: number) {
    if (page !== this.currentPage && page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadPokemons();
    }
  }

  // Toggle favorite state of a pokemon
  toggleFavorite(pokemon: any) {
    this.favoritesService.toggleFavorite(pokemon.id);
    pokemon.isFavorite = !pokemon.isFavorite;
  }

  // Navigate to the Pokémon details page
  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
}
