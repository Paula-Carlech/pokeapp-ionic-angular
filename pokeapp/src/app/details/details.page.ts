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
}
