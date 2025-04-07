import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HeroModel } from '../models/hero.model';
import { take } from 'rxjs/operators';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return paginated heroes', (done: DoneFn) => {
    service.getHeroes('', 1, 5).pipe(take(1)).subscribe(heroes => {
      expect(heroes.length).toBeLessThanOrEqual(5);
      done();
    });
  });

  it('should delete a hero', (done: DoneFn) => {
    const initialLength = service.heroesInMemoryArray.length;
    const heroToDelete = service.heroesInMemoryArray[0];
    service.deleteHero(heroToDelete.id).pipe(take(1)).subscribe(() => {
      expect(service.heroesInMemoryArray.length).toBe(initialLength - 1);
      done();
    });
  });

  it('should add a hero and assign a new id', (done: DoneFn) => {
    const newHero: HeroModel = { id: 0, name: 'TestHero', superpoder: 'TestPower', edad: 30, origen: 'TestLand' };
    service.addHero(newHero).pipe(take(1)).subscribe(hero => {
      expect(hero.id).toBeGreaterThan(0);
      expect(service.heroesInMemoryArray.find(h => h.id === hero.id)).toBeTruthy();
      done();
    });
  });
});
