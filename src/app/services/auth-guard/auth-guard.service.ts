import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements  CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot ) {

    return this.auth.user$.pipe(map(user => {
      console.log(user);
      if (user) {return true; }
        this.router.navigate(['/login'],{ queryParams: {returnUrl: state.url}});
        return false;
    }));
  }

}
