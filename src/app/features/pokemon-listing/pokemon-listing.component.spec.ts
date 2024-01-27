import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Pokemon } from '@model/pokemon.model';
import { PokeApiService } from '@services/poke-api/poke-api.service';
import { Observable, of } from 'rxjs';

import { PokemonListingComponent } from './pokemon-listing.component';

const mockData: Pokemon[] = [
  {
    name: 'Pikachu',
    imageUrl: 'assets/placeholder.png?1',
    abilities: [],
    evolutions: new Observable()
  },
  {
    name: 'Raichu',
    imageUrl: 'assets/placeholder.png?2',
    abilities: [],
    evolutions: new Observable()
  },
  {
    name: 'Bulbasaur',
    imageUrl: 'assets/placeholder.png?3',
    abilities: [],
    evolutions: new Observable()
  },
  {
    name: 'Caterpie',
    imageUrl: 'assets/placeholder.png?4',
    abilities: [],
    evolutions: new Observable()
  },
  {
    name: 'Onyx',
    imageUrl: 'assets/placeholder.png?5',
    abilities: [],
    evolutions: new Observable()
  },
  {
    name: 'Mewtwo',
    imageUrl: 'assets/placeholder.png?6',
    abilities: [],
    evolutions: new Observable()
  }
];

class PokeApiServiceMock {
  pokemonCount: number = mockData.length;
  fetchPokemons(): Observable<Observable<Pokemon>[]> {
    return of(mockData.map(item => of(item)));
  }
}

describe('PokemonListingComponent', () => {
  let component: PokemonListingComponent;
  let fixture: ComponentFixture<PokemonListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListingComponent],
      providers: [{
        provide: PokeApiService,
        useValue: new PokeApiServiceMock()
      }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PokemonListingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all Pokemons', waitForAsync(async() => {
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('app-list-item'));
    expect(items.length).toBe(mockData.length);
    items.forEach((item, index) => {
      expect(item.query(By.css('.footer')).nativeElement.textContent.trim()).toBe(mockData[index].name);
      expect(item.query(By.css('.content > img')).nativeElement.src).toContain(mockData[index].imageUrl);
    });
  }));

  it('should render the pagination data', waitForAsync(async() => {
    component.pageSize = 3;
    fixture.detectChanges();
    const paginator = fixture.debugElement.query(By.css('app-paginator'));
    expect(paginator.query(By.css('#pageInfo')).nativeElement.textContent.trim()).toBe('Page 1 of 2');
  }));

  it('should navigate to next page', waitForAsync(async() => {
    component.pageSize = 3;
    const secondPage = mockData.slice(3, 6);
    fixture.detectChanges();
    const paginator = fixture.debugElement.query(By.css('app-paginator'));
    const nextButton = paginator.query(By.css('#nextPageBtn'));
    nextButton.nativeElement.click();
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('app-list-item'));
    expect(items.length).toBe(secondPage.length);
    items.forEach((item, index) => {
      expect(item.query(By.css('.footer')).nativeElement.textContent.trim()).toBe(secondPage[index].name);
      expect(item.query(By.css('.content > img')).nativeElement.src).toContain(secondPage[index].imageUrl);
    });
    expect(paginator.query(By.css('#pageInfo')).nativeElement.textContent.trim()).toBe('Page 2 of 2');
  }));

  it('should navigate to previous page', waitForAsync(async() => {
    component.pageSize = 3;
    const firstPage = mockData.slice(0, 3);
    fixture.detectChanges();
    const paginator = fixture.debugElement.query(By.css('app-paginator'));
    const nextButton = paginator.query(By.css('#nextPageBtn'));
    const prevButton = paginator.query(By.css('#prevPageBtn'));
    nextButton.nativeElement.click();
    fixture.detectChanges();
    prevButton.nativeElement.click();
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('app-list-item'));
    expect(items.length).toBe(firstPage.length);
    items.forEach((item, index) => {
      expect(item.query(By.css('.footer')).nativeElement.textContent.trim()).toBe(firstPage[index].name);
      expect(item.query(By.css('.content > img')).nativeElement.src).toContain(firstPage[index].imageUrl);
    });
    expect(paginator.query(By.css('#pageInfo')).nativeElement.textContent.trim()).toBe('Page 1 of 2');
  }));

  it('should disable previous page button in first page', waitForAsync(async() => {
    component.pageSize = 3;
    fixture.detectChanges();
    const paginator = fixture.debugElement.query(By.css('app-paginator'));
    const prevButton = paginator.query(By.css('#prevPageBtn'));
    expect(prevButton.nativeElement.disabled).toBeTruthy();
  }));

  it('should disable next page button in last page', waitForAsync(async() => {
    component.pageSize = 3;
    fixture.detectChanges();
    const paginator = fixture.debugElement.query(By.css('app-paginator'));
    const nextButton = paginator.query(By.css('#nextPageBtn'));
    nextButton.nativeElement.click();
    fixture.detectChanges();
    expect(nextButton.nativeElement.disabled).toBeTruthy();
  }));
});
