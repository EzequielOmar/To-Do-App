import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  user: any = null;

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) {
    if (SessionService.logged()) this.router.navigate(['/']);
  }

  ngOnInit(): void {
    //this.checkKickOut();
    this.onUserLogIn();
  }

  //this.socialAuthService.signOut();

  logInWithGoogle() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((r) => {
        console.log('then');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private onUserLogIn() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user !== null) {
        const headers = new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        );
        let body = new HttpParams();
        body = body.set('id', user.id);
        body = body.set('displayName', user.name);
        this.http
          .post('http://localhost:8080/redirect', body, { headers: headers })
          .subscribe((res: any) => {
            console.log(res);
            if (res.accessToken && res.reloadToken)
              SessionService.setTokens(res.accessToken, res.reloadToken);
          });
      }
    });
  }

  /*
  private checkKickOut() {
    if (sessionStorage.getItem('expired')) {
      sessionStorage.setItem('expired', '');
      this.showErrorTokenExpired();
    }
  }

  private showErrorTokenExpired() {
    this.error = true;
    //setTimeout(() => {
    //  this.error = false;
    //}, 5000);
  }
  */
}
