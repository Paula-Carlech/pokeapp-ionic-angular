import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should create the app', async () => {
    // Configures the testing module with AppComponent and a mock router
    await TestBed.configureTestingModule({
      imports: [AppComponent],  // Import the standalone AppComponent
      providers: [provideRouter([])]  // Provide an empty router for routing dependencies
    }).compileComponents();

    // Create the component instance
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Check if the app component instance was created successfully
    expect(app).toBeTruthy();
  });
});
