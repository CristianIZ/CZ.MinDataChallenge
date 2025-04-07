import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroEditComponent } from './hero-edit.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('HeroEditComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { hero: { id: 1, name: 'TestHero', superpoder: 'TestPower', edad: 30, origen: 'TestLand' } } },
        { provide: MatDialogRef, useValue: {} }
      ],
      imports: [MatFormFieldModule, MatDialogModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule],
      // Asegúrate de importar los módulos necesarios si es preciso.
    })
    .compileComponents();
  });

  let component: HeroEditComponent;
  let fixture: ComponentFixture<HeroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
