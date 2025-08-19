import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../core/modules/material.module';
import { UsersService } from '../../core/services/users/users.service';
import { Router, RouterModule } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterModule],
  providers: [SnackbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registroForm!: FormGroup;
  public snackBarCustom = inject(SnackbarComponent);
  constructor(
    private fb: FormBuilder,
    public userService: UsersService,
    public router: Router
  ) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: [this.passwordMatchValidator] });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  async onSubmit() {
    if (this.registroForm.valid) {
      const { username, email, password } = this.registroForm.value;
      this.userService.registerUser({ username, email, password }).subscribe({
        next: (response: any) => {
          this.router.navigateByUrl(`/login`);
          this.snackBarCustom.openSnackBar(response.data.registerUser.message, 'Cerrar', 'center', 'top', 'success-snackbar');
        },
        error: (error: any) => {
          this.snackBarCustom.openSnackBar('Error, intente de nuevo', 'Cerrar', 'center', 'top', 'error-snackbar');
        }
      })
    }
  }

  get name() { return this.registroForm.get('name'); }
  get email() { return this.registroForm.get('email'); }
  get password() { return this.registroForm.get('password'); }
  get confirmPassword() { return this.registroForm.get('confirmPassword'); }
}
