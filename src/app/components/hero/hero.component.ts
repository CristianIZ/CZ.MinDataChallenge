import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { HeroModel } from '../../models/hero.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { HeroEditComponent } from '../hero-edit/hero-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-hero',
  imports: [MatTableModule, MatPaginator, CommonModule, MatCardModule, MatPaginatorModule, MatIconModule, MatDialogModule, MatInputModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: true
})
export class HeroComponent implements OnInit {

  public dataSource: HeroModel[] = [];
  public displayedColumns: string[] = ['name', 'superpoder', 'edad', 'origen', 'actions'];
  public pageSize: number = 5;
  public currentPage: number = 1;

  constructor(private dialog: MatDialog, private heroService: HeroService) { }

  ngOnInit(): void {
    this.loadHeroes();
  }

  private loadHeroes() {
    this.heroService.getHeroes(1, 5).subscribe((result) => {
      this.dataSource = result;
    })
  }

  public onPaginateChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadHeroes();
  }

  onEdit(hero: HeroModel): void {
    const dialogRef = this.dialog.open(HeroEditComponent, {
      width: '400px',
      data: hero
    });

    dialogRef.afterClosed().subscribe((updatedHero: HeroModel | undefined) => {
      if (updatedHero) {
        const index = this.heroService.heroesInMemoryArray.findIndex(h => h.id === updatedHero.id);
        if (index !== -1) {
          this.heroService.heroesInMemoryArray[index] = updatedHero;
          this.dataSource = [...this.heroService.heroesInMemoryArray];
        }
      }
    });
  }

  onDelete(hero: HeroModel): void {
    // Lógica para eliminar el héroe
    console.log('Eliminar', hero);
  }
}
