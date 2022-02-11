import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private router: Router) {}

  /**
   * Log the user in, Remove token variable from url, and return true
   * Or return false if no token was sended
   * @param token token variable from url
   * token -> (sended from the server to root website by get param as `token`
   * @returns boolean
   */
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

  logOut() {
    sessionStorage.setItem('token', '');
  }

  /**
   * remove token variable from sessionStorage
   * and add expired variable to true (in order to show error message in login page)
   */
  forceLogOut() {
    this.logOut();
    sessionStorage.setItem('expired', 'true');
  }
}
