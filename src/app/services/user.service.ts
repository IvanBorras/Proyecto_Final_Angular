import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = `${environment.API_URL}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.get<User[]>(`${this.url}/all`, { headers });
  }

  updateUser(userId: string, userData: any): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.patch<User>(`${this.url}/update/${userId}`, userData, { headers });
  }

  deleteUser(userId: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.delete(`${this.url}/${userId}`,{headers})
  }

}