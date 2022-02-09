import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private router: Router) {}

  logIn(token: string | null): boolean {
    if (token) {
      window.history.pushState('', '', '/');
      sessionStorage.setItem('token', token);
      return true;
    }
    return false;
  }

  logged(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }

  forceLogOut() {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('expired', 'true');
  }
}
