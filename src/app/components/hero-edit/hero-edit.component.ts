import { Component, inject, Inject, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeroModel } from '../../models/hero.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogAction } from '../../models/dialog-action.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-edit',
  imports: [MatFormFieldModule, MatDialogModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule],
  providers: [HeroModel],
  templateUrl: './hero-edit.component.html',
  styleUrl: './hero-edit.component.css',
  standalone: true
})
export class HeroEditComponent {
  public editForm: FormGroup;
  public viewMode: boolean = false;
  readonly dialogRef = inject(MatDialogRef<HeroEditComponent>);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { hero: HeroModel, action: DialogAction }
  ) {
    this.editForm = this.fb.group({
      name: [data?.hero?.name ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      superpoder: [data?.hero?.superpoder ?? '', [Validators.required, Validators.minLength(8)]],
      edad: [data?.hero?.edad ?? '', [Validators.required, Validators.min(0)]],
      origen: [data?.hero?.origen ?? '', Validators.required]
    });

    this.viewMode = data.action == DialogAction.view;
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
