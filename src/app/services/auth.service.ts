import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null = null;
  url: string = `${environment.API_URL}/users`; // Usa la variable de entorno

  
  constructor(private http: HttpClient, private router: Router) {
    // Rescatar usuario de localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
  
  signup(name: string, email: string, pwd: string) {
    return this.http.post(
      `${this.url}/register`,
      {
        name: name,
        email: email,
        password: pwd
      }
    );
  }

  login(email: string, pass: string) {
    return this.http.post(`${this.url}/login`, {
      email: email,
      password: pass,
    }); 
  }

  saveUser(user: User) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  deleteUser() {
    this.user = null;
    localStorage.removeItem("user");
    this.router.navigateByUrl("/");
    // window.location.reload(); // Recargar la página

    
  }

  isUserAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  getUser(): User | null {
    if (this.user === null) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
    return this.user;
  }
}
