import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public user?: SocialUser;
  public error: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public server_host = environment.server_host;

  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.addWindowStorageEvents();
    this.addUserAuthStateListener();
  }

  signIn(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .catch((e) => {
        this.error = e.message;
      });
  }

  /**
   * Unset sessionStorage tokens,
   * Close socialAuth session and
   * Redirect user to login
   */
  signOut(): void {
    localStorage.setItem('forceLogout', Date.now().toString());
    this.signedIn.next(false);
    sessionStorage.setItem('accessToken', '');
    sessionStorage.setItem('reloadToken', '');
    if (this.user) this.socialAuthService.signOut();
  }

  reloadTokens() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true,
      observe: 'response' as 'response',
    };
    let body = new HttpParams();
    body = body.set('reloadToken', sessionStorage.getItem('reloadToken') ?? '');
    this.http
      .post(this.server_host + '/reloadTokens', body, httpOptions)
      .subscribe((res: any) => {
        if (!res.body.accessToken || !res.body.reloadToken) {
          this.error.next(
            'Token expired, session reload fail. Please log in again.'
          );
          this.signOut();
        } else {
          sessionStorage.setItem('accessToken', res.body.accessToken);
          sessionStorage.setItem('reloadToken', res.body.reloadToken);
        }
      });
  }

  private getTokens() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true,
      observe: 'response' as 'response',
    };
    let body = new HttpParams();
    body = body.set('id', this.user?.id ?? '');
    body = body.set('displayName', this.user?.name ?? '');
    this.http
      .post(this.server_host + '/redirect', body, httpOptions)
      .subscribe((res: any) => {
        if (!res.body.accessToken || !res.body.reloadToken)
          this.error.next('Upss, something went wrong.');
        else {
          sessionStorage.setItem('accessToken', res.body.accessToken);
          sessionStorage.setItem('reloadToken', res.body.reloadToken);
          this.signedIn.next(true);
        }
      });
  }

  private addWindowStorageEvents() {
    //if not session storage, try to get it from another tab
    if (!sessionStorage.length)
      localStorage.setItem('getSessionStorage', Date.now().toString());
    window.addEventListener('storage', (event) => {
      switch (event.key) {
        case 'getSessionStorage':
          // Some tab asked for sessionStorage -> send it
          localStorage.setItem(
            'sessionStorage',
            JSON.stringify(sessionStorage)
          );
          localStorage.removeItem('sessionStorage');
          break;
        case 'sessionStorage':
          if (!sessionStorage.length && event.newValue) {
            // sessionStorage is empty -> fill it
            let values = JSON.parse(event.newValue);
            Object.keys(values).forEach((key: any) =>
              sessionStorage.setItem(key, values[key])
            );
          }
          break;
        case 'forceLogout':
          //force log out in all screens
          this.signOut();
          localStorage.removeItem('forceLogout');
          break;
      }
    });
    //delete session data before closs browser
    window.onbeforeunload = () => sessionStorage.clear();
  }

  private addUserAuthStateListener() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.user = user ?? null;
      if (this.user) this.getTokens();
      //kick user auth and show error on login page
      else if (!this.router.url.includes('login'))
        this.router.navigate(['login']);
    });
  }
}
