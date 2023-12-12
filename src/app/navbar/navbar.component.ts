import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  username: string = '';
  constructor(
    private authService: AuthService, 
    private router: Router,private userService: UserService) {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {      
      this.userService.getCurrentUserObservable().subscribe(data => this.username = data.user.name)
      console.log('currentUser',this.username)
    } else {
      console.log('not logged in')
      this.username = '';
    }
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.userService.getCurrentUserObservable().subscribe(data => this.username = data.user.name)
    if (this.isLoggedIn) {      
      console.log('currentUser',this.username)
    } else {
      console.log('not logged in')
      this.username = '';
    }
  }
  
  toggleLogin() {
    if (this.isLoggedIn) {
      this.authService.logout();  
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
