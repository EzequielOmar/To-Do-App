import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FolderListComponent } from 'src/app/components/folder-list/folder-list.component';
import { TaskListComponent } from 'src/app/components/task-list/task-list.component';
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
  @ViewChild('folderList') folderList?: FolderListComponent;
  @ViewChild('taskList') taskList?: TaskListComponent;
  @ViewChild('modifUserName') modifUserName?: ElementRef<Input>;

  constructor(private ds: DataService, private router: Router) {
  //  this.logOrRedirectToLogin();
  }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * Listen to click event in all the main component
   * Check if the click is not on the modifFolderInput and modifTaskInput (input of folder and tasks name)
   * If the user click outside the name inputs the input get readonly.
   * @param e evento click
   */
  @HostListener('click', ['$event'])
  click(e: any) {
    if (
      this.folderList?.modifFolderInput?.nativeElement !== e.target &&
      this.taskList?.modifTaskInput?.nativeElement !== e.target &&
      this.modifUserName?.nativeElement !== e.target
    )
      this.readonly = true;
  }

  updateNames() {
    this.readonly = false;
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

  //service call
  async getData() {
    this.spinner = true;
    console.log('getData');
    try {
      await this.ds
        .getAllUserData()
        .then((res: any) => {
          console.log('getData then');
          this.userData = {};
          this.userData = res.data.User;
        })
        .finally(() => {
          console.log('getData final');
          this.spinner = false;
          this.readonly = true;
        });
    } catch (err) {
      this.redirectToError();
    }
  }

  updateUserName(name: string) {
    this.ds.updateUserName(name).subscribe(
      (res: any) => {
        this.getData();
      },
      (err) => {
        this.redirectToError();
      }
    );
  }

  deleteUser() {
    this.ds
      .deleteUser()
      .toPromise()
      .finally(() => {
        this.logOut();
      });
  }

  logOut() {
    SessionService.logOut();
    this.router.navigate(['login']);
  }

  /**
   * Close the current session (unset sessionStoragge vars)
   * And refirect to login, showing the token expired error message
   */
  redirectToError() {
    SessionService.forceLogOut();
    this.router.navigate(['login']);
  }

  /**
   * Check for a current open session
   * try to log in passing the current url (that may have the token value from server)
   * if bolth fail, redirect to login
   */
  private logOrRedirectToLogin() {
    if (!SessionService.logged()) this.router.navigate(['login']);
  }
}
