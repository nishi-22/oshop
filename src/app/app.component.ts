import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {templateJitUrl} from '@angular/compiler';
import {UsersService} from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private auth: AuthService, router: Router, private userService: UsersService) {

    auth.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }

    });

  }
   }
