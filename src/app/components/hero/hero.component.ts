import { Component, inject, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { HeroModel } from '../../models/hero.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { HeroEditComponent } from '../hero-edit/hero-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogAction } from '../../models/dialog-action.model';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  imports: [MatTableModule, MatPaginator, CommonModule, MatCardModule, MatPaginatorModule, MatIconModule, MatDialogModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: true
})
export class HeroComponent implements OnInit {

  public dataSource = new MatTableDataSource<HeroModel>();
  public displayedColumns: string[] = ['name', 'superpoder', 'edad', 'origen', 'actions'];
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalHeroes: number = 0;
  public filterValue = '';

  constructor(private dialog: MatDialog, private heroService: HeroService) { }

  async ngOnInit() {
    this.loadHeroes();
  }

  private loadHeroes(): void {
    this.getTotalHeroes();
    this.heroService.getHeroes(this.filterValue, this.currentPage, this.pageSize).subscribe((result: HeroModel[]) => {
      this.dataSource.data = result;
    })
  }

  private getTotalHeroes() {
    this.heroService.getTotalHeroes(this.filterValue).subscribe((total: number) => {
      this.totalHeroes = total
    });
  }

  public onPaginateChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadHeroes();
  }

  public onView(hero: HeroModel): void {
    this.preventAreaBlockError();
    const dialogRef = this.dialog.open(HeroEditComponent, {
      width: '400px',
      data: {
        hero: hero,
        action: DialogAction.view
      }
    });

    dialogRef.afterClosed().subscribe((newHero: HeroModel | undefined) => {
      if (newHero) {
        this.heroService.addHero(newHero).subscribe({
          next: (hero: HeroModel) => {
            this.totalHeroes = this.heroService.heroesInMemoryArray.length;
            this.loadHeroes();
          },
          error: (error) => {
            console.error("Error al eliminar el héroe:", error);
          }
        });
      }
    });
  }

  public onAdd(): void {
    this.preventAreaBlockError();
    const dialogRef = this.dialog.open(HeroEditComponent, {
      width: '400px',
      data: {
        hero: null,
        action: DialogAction.add
      }
    });

    dialogRef.afterClosed().subscribe((newHero: HeroModel | undefined) => {
      if (newHero) {
        this.heroService.addHero(newHero).subscribe({
          next: (hero: HeroModel) => {
            this.totalHeroes = this.heroService.heroesInMemoryArray.length;
            this.loadHeroes();
          },
          error: (error) => {
            console.error("Error al eliminar el héroe:", error);
          }
        });
      }
    });
  }

  public async onEdit(hero: HeroModel): Promise<void> {
    this.preventAreaBlockError();
    let dialogRef = this.dialog.open(HeroEditComponent, {
      width: '400px',
      data: {
        hero: hero,
        action: DialogAction.edit
      }
    });

    dialogRef.afterClosed().subscribe(async (updatedHero: HeroModel | undefined) => {
      if (updatedHero) {
        this.heroService.updateHero(updatedHero).subscribe({
          next: () => {
            this.loadHeroes();
          },
          error: (error) => {
            console.error("Error al eliminar el héroe:", error);
          }
        });
      }
    });
  }

  public async onDelete(hero: HeroModel): Promise<void> {
    let confirmation = confirm(`¿Está seguro que desea eliminar el héroe ${hero.name}?`);

    if (confirmation) {
      this.heroService.deleteHero(hero.id).subscribe({
        next: async () => {
          this.totalHeroes = this.heroService.heroesInMemoryArray.length;

          if (this.currentPage > this.totalHeroes) {
            this.currentPage = 1;
          }

          if (this.currentPage > Math.ceil(this.totalHeroes / this.pageSize)) {
            this.currentPage = Math.ceil(this.totalHeroes / this.pageSize) || 1;
          }

          await this.loadHeroes();
        },
        error: (error) => {
          console.error("Error al eliminar el héroe:", error);
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.loadHeroes();
  }

  private preventAreaBlockError() {
    // When a modal is opened, ng-bootstrap adds aria-hidden="true" to the 'app-root' element
    // to make it inaccessible to assistive technologies while the modal is active.

    // Real solution create an interceptor to get element and blur
    // to save time let's leave like this for now
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();
  }
}
