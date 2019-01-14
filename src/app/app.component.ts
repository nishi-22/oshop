import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from './services/user/users.service';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private auth: AuthService, router: Router, private userService: UsersService) {

    auth.user$.subscribe(user => {
      if (!user) return;

      userService.save(user);
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });

  }


   }
