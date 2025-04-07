import { Injectable } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public heroesInMemoryArray: HeroModel[] = [
    { id: 1, name: "Superman", superpoder: "Superfuerza, vuelo, visión de calor", edad: 35, origen: "Krypton" },
    { id: 2, name: "Batman", superpoder: "Intelecto superior, artes marciales, tecnología avanzada", edad: 40, origen: "Gotham City" },
    { id: 3, name: "Spider-Man", superpoder: "Sentido arácnido, agilidad sobrehumana, telarañas", edad: 25, origen: "Nueva York" },
    { id: 4, name: "Iron Man", superpoder: "Armadura de alta tecnología, inteligencia extrema", edad: 45, origen: "Estados Unidos" },
    { id: 5, name: "Wonder Woman", superpoder: "Fuerza sobrehumana, inmortalidad, lazo de la verdad", edad: 3000, origen: "Themyscira" },
    { id: 6, name: "Hulk", superpoder: "Fuerza ilimitada, resistencia extrema", edad: 40, origen: "Estados Unidos" },
    { id: 7, name: "Thor", superpoder: "Dios del trueno, inmortalidad, Mjolnir", edad: 1500, origen: "Asgard" },
    { id: 8, name: "Flash", superpoder: "Supervelocidad, reflejos mejorados, viaje en el tiempo", edad: 28, origen: "Central City" },
    { id: 9, name: "Captain America", superpoder: "Fuerza mejorada, escudo indestructible, liderazgo", edad: 105, origen: "Estados Unidos" },
    { id: 10, name: "Black Panther", superpoder: "Fuerza sobrehumana, agilidad, traje de vibranium", edad: 35, origen: "Wakanda" },
    { id: 11, name: "Doctor Strange", superpoder: "Magia, manipulación del tiempo, hechicería", edad: 42, origen: "Estados Unidos" },
    { id: 12, name: "Wolverine", superpoder: "Regeneración, garras de adamantium, sentidos agudos", edad: 150, origen: "Canadá" },
    { id: 13, name: "Aquaman", superpoder: "Superfuerza, control del agua, comunicación con criaturas marinas", edad: 35, origen: "Atlántida" },
    { id: 14, name: "Green Lantern", superpoder: "Anillo de poder con habilidades cósmicas", edad: 30, origen: "Tierra (Sector 2814)" },
    { id: 15, name: "Deadpool", superpoder: "Regeneración avanzada, habilidades de combate", edad: 35, origen: "Canadá" }
  ];

  constructor() { }

  public addHero(newHero: HeroModel): Observable<HeroModel> {
    let newId;

    if (this.heroesInMemoryArray.length > 0) {
      newId = Math.max(...this.heroesInMemoryArray.map(hero => hero.id)) + 1;
    }
    else {
      newId = 1;
    }

    newHero.id = newId;
    this.heroesInMemoryArray.push(newHero);
    return of(newHero);
  }

  public getHeroes(filterValue: string, page: number, pageSize: number): Observable<HeroModel[]> {
    let filteredValues = this.heroesInMemoryArray.filter(h => h.name.toString().includes(filterValue)) ?? [];

    const startIndex = (page - 1) * pageSize;
    const paginatedResults = filteredValues.slice(startIndex, startIndex + pageSize);
    return of(paginatedResults);
  }

  public getTotalHeroes(filterValue: string): Observable<number> {
    let filteredValues = this.heroesInMemoryArray.filter(h =>
      h.edad.toString().includes(filterValue) ||
      h.name.toString().includes(filterValue) ||
      h.origen.toString().includes(filterValue) ||
      h.superpoder.toString().includes(filterValue)) ?? [];

    return of(filteredValues.length);
  }

  public getHeroById(id: number): Observable<HeroModel | undefined> {
    const hero = this.heroesInMemoryArray.find(h => h.id == id);
    return of(hero);
  }

  public updateHero(heroToEdit: HeroModel): Observable<void> {
    debugger;
    if (heroToEdit && heroToEdit.id) {
      console.error("Id is required");
      throw new Error("Id is required");
    }

    let currentHeroIndex = this.heroesInMemoryArray.findIndex(h => h.id == heroToEdit.id);

    if (currentHeroIndex == -1) {
      console.error("Invalid Id:");
      throw new Error("Invalid Id");
    }

    this.heroesInMemoryArray.splice(currentHeroIndex, 1);
    this.heroesInMemoryArray.push(heroToEdit);
    return of(undefined);
  }

  public deleteHero(id: number): Observable<void> {
    let index = this.heroesInMemoryArray.findIndex(hero => hero.id == id);

    if (index == -1) {
      console.error("Invalid Id:");
      throw new Error("Invalid Id");
    }

    this.heroesInMemoryArray.splice(index, 1);

    return of(undefined);
  }
}
