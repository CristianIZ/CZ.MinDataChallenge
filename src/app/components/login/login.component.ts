import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class emailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class passwordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {

  public loginForm: FormGroup;
  public emailMatcher = new emailErrorStateMatcher();
  public passwordMatcher = new passwordErrorStateMatcher();

  constructor(private fb: FormBuilder,
    private authService: SessionService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  public onSubmit(): void {
    console.log('Form valid status: ', this.loginForm.value);
    if (!this.loginForm.valid) {
      return;
    }

    let session = this.authService.AuthUser();

    if (session) {
      this.router.navigate(['/home']);
    }
  }

  public hasAnyErrors(control: AbstractControl): boolean {
    return control.errors != null;
  }

  public getErrorMessages(control: AbstractControl): string[] {
    if (control.errors) {
      return Object.keys(control.errors);
    }
    return [];
  }
}
