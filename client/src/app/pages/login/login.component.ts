import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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

  /**
   * Show session expired error
   */
  private showErrorTokenExpired() {
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }
}
