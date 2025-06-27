import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesPage } from './favorites.page';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;

  beforeEach(async () => {
    // Configure the testing module for the FavoritesPage component
    await TestBed.configureTestingModule({
      declarations: [FavoritesPage], // Declare the component to test
      // Import any modules or providers here if FavoritesPage depends on them
    }).compileComponents();

    // Create component instance and trigger change detection
    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Check if the component instance was created successfully
    expect(component).toBeTruthy();
  });
});
