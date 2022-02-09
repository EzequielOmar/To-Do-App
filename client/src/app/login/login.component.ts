import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //muestra el error de token expirado
  error: boolean = false;

  constructor(private session: SessionService, private router: Router) {
    if (this.session.logged()) this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.checkKickOut();
  }

  private checkKickOut() {
    if (sessionStorage.getItem('expired')) {
      sessionStorage.setItem('expired', '');
      this.showErrorTokenExpired();
    }
  }

  private showErrorTokenExpired() {
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }
}
