import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-urlshortner',
  templateUrl: './urlshortner.component.html',
  styleUrls: ['./urlshortner.component.css']
})
export class UrlshortnerComponent {
  originalUrl!: string;
  shortenedUrl!: string;
  constructor(private userservice:UserService){

  }

  onSubmit(){
  this.userservice.shortenUrl(this.originalUrl).subscribe(
    (response) => {
      this.shortenedUrl = response.shortUrl;
    },
    (error) => {
      console.error('Error shortening URL:', error);
      // Handle error as needed
    }
  
  )
  }
}
