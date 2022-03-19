import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public user?: SocialUser;
  public error: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.user = user ?? null;
      if (this.user) this.getTokens();
    });
  }

  signIn(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .catch((e) => {
        this.error = e.message;
      });
  }

  signOut(): void {
    this.signedIn.next(false);
    sessionStorage.setItem('accessToken', '');
    sessionStorage.setItem('reloadToken', '');
    if (this.user) this.socialAuthService.signOut();
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
      .post('http://localhost:8080/redirect', body, httpOptions)
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
}
