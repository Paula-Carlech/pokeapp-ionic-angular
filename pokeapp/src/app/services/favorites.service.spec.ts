import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should start with empty favorites', () => {
    expect(service.getFavorites().length).toBe(0);
  });

  it('should add and remove favorite', () => {
    service.toggleFavorite('pikachu');
    expect(service.isFavorite('pikachu')).toBeTrue();

    service.toggleFavorite('pikachu');
    expect(service.isFavorite('pikachu')).toBeFalse();
  });
});
