import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPage } from './details.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;
  let mockPokemonService: any;

  beforeEach(async () => {
    mockPokemonService = {
      getPokemonDetails: jasmine.createSpy().and.returnValue(of({ name: 'pikachu', types: [], abilities: [], stats: [], sprites: {} }))
    };

    await TestBed.configureTestingModule({
      declarations: [DetailsPage],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'pikachu' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load Pokémon details on init', () => {
    expect(mockPokemonService.getPokemonDetails).toHaveBeenCalledWith('pikachu');
    expect(component.pokemon.name).toBe('pikachu');
  });
});
