import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interfaces/login-response';
import { User } from '../../interfaces/user';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordType: string = "password"
  form!: FormGroup
  errorMessage: string = '';

  constructor(private builder: FormBuilder,
    private authService: AuthService,
    private router: Router){
    this.form = builder.group({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required])
    })
  }

  login(){
    const email: string = this.form.value.email 
    const pass: string = this.form.value.password
    
    this.authService.login(email, pass).subscribe({
      next: (response)=>{
        const loginResponse: LoginResponse = response as LoginResponse
        const user: User = { token: loginResponse.token, _id: loginResponse.id, role: loginResponse.role}
        console.log(loginResponse);
        this.authService.saveUser(user)
        // this.router.navigateByUrl("/")
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: 'Disfruta del mejor cine.',
        }).then(() => {
          this.router.navigateByUrl("/");
        });
      },
      error: (error) => {
        // Maneja los errores de registro según el código de estado
        if (error.status === 404) { // 404: Usuario no existe
          Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'Usuario no existe. Por favor intentelo de nuevo o registrese.',
          });
        } else if(error.status === 401) { // 404: no autorizado
          Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'La contraseña es incorrecta. Por favor intenta nuevamente.',
          });
        }
      }
    })
  }

  
}