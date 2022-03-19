import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class redirectUnauthenticatedGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return new Observable((subscriber) => {
      this.auth.signedIn.subscribe((signedIn: boolean) => {
        if (signedIn) return subscriber.next(true);
        return subscriber.next(this.router.createUrlTree(['login']));
      });
    });
  }
}
