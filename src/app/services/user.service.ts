import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;
  

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser())
  }

  registerUser(user: object): any {
    return this.http.post('http://localhost:3000/user/register', user)
  }

  async loginUser(email: string, password: string): Promise<any> {
    const dataToPass = {
      email,
      password
    };
  
    try {
      const res = await this.http.post('http://localhost:3000/user/login', dataToPass).toPromise();
      const userData: any = res;
        return userData;
    } catch (error) {
      console.log('error', error);
      throw error; 
    }
  }
  shortenUrl(longUrl: string): Observable<any> {
    const requestBody = { longUrl };

    return this.http.post<any>('http://localhost:3000/urls/shorten', requestBody);
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  logoutUser(): void {
    localStorage.removeItem('currentUser');
  }
  getCurrentUserObservable(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
  setCurrentUser(newUser: object): void {
    console.log('logging')
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    this.currentUserSubject.next(newUser);
    console.log(newUser)
  }
}
