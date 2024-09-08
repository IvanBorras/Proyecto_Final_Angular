import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  passwordType: string = "password";
  errorMessage: string = '';
  form!: FormGroup;

  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = builder.group({
      "name": new FormControl(null, [Validators.required]),
      "email": new FormControl(null, [Validators.required, Validators.email, this.customEmailValidator]), // Validación personalizada
      "pwd": new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  // Validación personalizada para el email
  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email: string = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu)$/; // Acepta .com, .org, .net, .edu
    if (email && !emailRegex.test(email)) {
      return { invalidEmail: true }; // Retorna un error si el email no es válido
    }
    return null; // Email válido
  }

  signup() {
    // Validar el formulario antes de enviar
    if (this.form.invalid) {
      this.handleFormValidationErrors();
      return;
    }

    // Si el formulario es válido, intenta registrarse
    this.authService.signup(this.form.value.name, this.form.value.email, this.form.value.pwd).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Has sido registrado con éxito. Por favor, inicia sesión.',
        }).then(() => {
          this.router.navigateByUrl("/login");
        });
      },
      error: (error) => {
        // Maneja los errores de registro según el código de estado
        if (error.status === 409) { // 409: Usuario ya existe
          Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'Usuario ya existe. Por favor intenta con otro.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'Ha ocurrido un error al registrar. Por favor intenta nuevamente.',
          });
        }
      }
    });
  }

  // Maneja los errores de validación del formulario
  private handleFormValidationErrors() {
    if (this.form.get('name')?.invalid) {
      this.errorMessage = 'Por favor ingresa un nombre válido.';
    } else if (this.form.get('email')?.invalid) {
      if (this.form.get('email')?.errors?.['email'] || this.form.get('email')?.errors?.['invalidEmail']) {
        this.errorMessage = 'Por favor ingresa un correo electrónico válido que termine en example.com, .org, .net, o .edu.';
      } else {
        this.errorMessage = 'Por favor ingresa un correo electrónico.';
      }
    } else if (this.form.get('pwd')?.invalid) {
      if (this.form.get('pwd')?.errors?.['minlength']) {
        this.errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
      } else {
        this.errorMessage = 'Por favor ingresa una contraseña.';
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: this.errorMessage,
    });
  }
}
