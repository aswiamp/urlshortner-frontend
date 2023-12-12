import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService) { }
  check = this.userService.getCurrentUser().token ? true : false;
  // return the recent value
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.check);
  isLoggedIn = this.isLoggedInSubject.asObservable();
  login() {
    this.isLoggedInSubject.next(true); //next-(emit the most recent value)
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.userService.setCurrentUser({})
  }

}
