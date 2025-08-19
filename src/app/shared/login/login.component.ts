import { AfterViewInit, Component, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { MaterialModule } from '../../core/modules/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Router, RouterModule } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../core/services/shared.service';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, SnackbarComponent]
})

export default class LoginComponent implements OnInit, AfterViewInit {
  public loginForm!: FormGroup;
  public error = 'Verifique la información ingresada';
  protected readonly isMobile = signal(true);
  public snackBarCustom = inject(SnackbarComponent);
  public payload: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public authService: AuthService,
    public fb: FormBuilder,
    public router: Router,
    public sharedService: SharedService
  ) { }
  /**
   * Inicializa el botón de Google Sign-In después de que la vista se haya inicializado.
   * Configura el cliente de Google y renderiza el botón en el elemento con ID 'google-button'.
   */
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        google.accounts.id.initialize({
          client_id: '900476400599-llhuo4ejpv2nkvhjphu18364h3ng9165.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        google.accounts.id.renderButton(
          document.getElementById('google-button'),
          { theme: 'outline', size: 'large' }
        );

        google.accounts.id.prompt();
      };
      this.document.head.appendChild(script);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  handleCredentialResponse(response: any) {
    const token = response.credential;
    this.payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Usuario:', this.payload);
    this.sharedService.setPayload(this.payload)
    this.snackBarCustom.openSnackBar('Bienvenido', 'Cerrar', 'center', 'top', 'success-snackbar');
    this.router.navigate(['/home']);
    // Aquí puedes guardar el token o redirigir al dashboard
  }

  submit() {
    this.authService.authUser(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (response: any) => {
        if (response.data.authUser.success) {
          this.snackBarCustom.openSnackBar('Bienvenido', 'Cerrar', 'center', 'top', 'success-snackbar');
          this.router.navigate(['/home']);
        }
        // Maneja la respuesta (por ejemplo, guarda el token en el localStorage)
      },
      error: (error: any) => {
        this.snackBarCustom.openSnackBar(error, 'Cerrar', 'center', 'top', 'success-snackbar');
        // Maneja el error (por ejemplo, muestra un mensaje al usuario)
      }
    });

  }
}
