import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Pokémon list', () => {
    const mockResponse = {
      results: [{ name: 'pikachu' }, { name: 'bulbasaur' }]
    };

    service.getPokemons(0, 2).subscribe((data) => {
      expect(data.results.length).toBe(2);
      expect(data.results[0].name).toBe('pikachu');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=2');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
