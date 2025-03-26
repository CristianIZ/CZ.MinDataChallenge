import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeroModel } from '../../models/hero.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-edit',
  imports: [MatFormFieldModule, MatDialogModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './hero-edit.component.html',
  styleUrl: './hero-edit.component.css',
  standalone: true
})
export class HeroEditComponent {
  public editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeroEditComponent>,
    public data: HeroModel
  ) {
    this.editForm = this.fb.group({
      name: [data.name, Validators.required],
      superpoder: [data.superpoder, Validators.required],
      edad: [data.edad, [Validators.required, Validators.min(0)]],
      origen: [data.origen, Validators.required]
    });
  }

  public onSave(): void {
    if (this.editForm.valid) {
      const updatedHero: HeroModel = {
        ...this.data,
        ...this.editForm.value
      };

      this.dialogRef.close(updatedHero);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
