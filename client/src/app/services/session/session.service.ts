import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  static setTokens(accessToken: string, reloadToken: string): void {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('accessToken', reloadToken);
    console.log(SessionService.logged());
  }

  static logged(): boolean {
    return sessionStorage.getItem('accessToken') ? true : false;
  }

  static logOut() {
    sessionStorage.setItem('token', '');
  }

  /**
   * remove token variable from sessionStorage
   * and add expired variable to true (in order to show error message in login page)
   */
  static forceLogOut() {
    this.logOut();
    sessionStorage.setItem('expired', 'true');
  }
}
