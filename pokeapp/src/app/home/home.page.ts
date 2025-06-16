import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: 'home.page.html',
})
export class HomePage {
  pokemons: any[] = [];
  offset = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  // Load Pokémon with pagination
  loadPokemons() {
    this.pokemonService.getPokemons(20, this.offset).subscribe((data) => {
      data.results.forEach((p: any) => {
        const id = p.url.split('/')[6];
        this.pokemons.push({
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          id: id
        });
      });
    });
  }

  loadMore() {
    this.offset += 20;
    this.loadPokemons();
  }
}
