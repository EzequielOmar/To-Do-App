import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  userData?: any;
  spinner: boolean = false;
  selectedFid?: string;
  readonly: boolean = true;
  @ViewChild('#modifTaskInput') modifTaskInput?: ElementRef;
  @ViewChild('modifFolderInput') modifFolderInput?: ElementRef<Input>;

  constructor(
    private ds: DataService,
    private session: SessionService,
    private router: Router
  ) {
    this.logOrRedirectToLogin();
  }

  ngOnInit(): void {
    this.getData();
  }

  @HostListener('click', ['$event'])
  click(e: any) {
    if (this.modifFolderInput?.nativeElement !== e.target) this.readonly = true;
  }

  /**
   * @returns the current selected folder, or an empty string
   */
  getCurrentFolder(): string {
    return this.selectedFid
      ? this.userData?.ufolders.filter(
          (f: any) => f._id === this.selectedFid
        )[0]
      : '';
  }

  /**
   * Close the current session (unset sessionStoragge vars)
   * And refirect to login, showing the token expired error message
   */
  redirectToError() {
    this.session.forceLogOut();
    this.router.navigate(['login']);
  }

  //service call
  async getData() {
    this.spinner = true;
    try {
      await this.ds
        .getData()
        .then((res: any) => {
          this.userData = {};
          this.userData = res.data.User;
        })
        .finally(() => {
          this.spinner = false;
        });
    } catch (err) {
      this.redirectToError();
    }
  }

  /**
   * Check for a current open session
   * try to log in passing the current url (that may have the token value from server)
   * if bolth fail, redirect to login
   */
  private logOrRedirectToLogin() {
    if (
      !this.session.logged() &&
      !this.session.logIn(
        new URL(document.location.href).searchParams.get('token')
      )
    )
      this.router.navigate(['login']);
  }
}
