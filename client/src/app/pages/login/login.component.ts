import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: any = null;
  error: string = '';

  constructor(private router: Router, private auth: AuthService) {
    this.auth.signedIn.subscribe((signedIn: boolean) => {
      if (signedIn) this.router.navigate(['']);
    });
    this.auth.error.subscribe((error: string) => {
      this.error = error;
    });
  }

  googleAuthProvider() {
    this.auth.signIn();
  }
}
