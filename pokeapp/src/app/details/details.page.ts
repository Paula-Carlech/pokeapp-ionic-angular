import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './details.page.html',
})
export class DetailsPage implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  currentYear = new Date().getFullYear(); // Current year for footer display

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('id')!;
    this.pokemonService.getPokemonDetails(name).subscribe((data) => {
      this.pokemon = data;
    });
  }

  // Returns a string with all type names separated by comma
  getTypes(): string {
    if (!this.pokemon) return '';
    return this.pokemon.types.map((t: any) => t.type.name).join(', ');
  }

  getAbilities(): string {
    if (!this.pokemon) return '';
    return this.pokemon.abilities.map((a: any) => a.ability.name).join(', ');
  }

  getStats(): string {
    if (!this.pokemon) return '';
    return this.pokemon.stats
      .map((s: any) => `${s.stat.name}: ${s.base_stat}`)
      .join(', ');
  }

  // Function to get all available sprite URLs from the pokemon object
  getAllSprites(): string[] {
    const sprites = this.pokemon?.sprites;
    if (!sprites) return [];

    // Collect URLs from top-level sprite properties that are strings and not null
    const urls = Object.keys(sprites)
      .filter(key => typeof sprites[key] === 'string' && sprites[key])
      .map(key => sprites[key]);

    // Also check animated sprites inside versions.generation-v.black-white.animated
    const animatedSprites = sprites?.versions?.['generation-v']?.['black-white']?.animated;
    if (animatedSprites) {
      Object.keys(animatedSprites).forEach(key => {
        if (animatedSprites[key]) {
          urls.push(animatedSprites[key]);
        }
      });
    }

    // Remove duplicates if any
    const uniqueUrls = Array.from(new Set(urls));

    // Adicionei este console.log para verificar as URLs
    console.log('Sprites encontradas:', uniqueUrls);

    return uniqueUrls;
  }
}
