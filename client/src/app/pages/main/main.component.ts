import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FolderListComponent } from 'src/app/components/folder-list/folder-list.component';
import { TaskListComponent } from 'src/app/components/task-list/task-list.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from '../../services/data/data.service';

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

  constructor(
    private ds: DataService,
    private router: Router,
    private auth: AuthService
  ) {}

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
    try {
      await this.ds
        .getAllUserData()
        .then((res: any) => {
          this.userData = {};
          this.userData = res.data.User;
        })
        .finally(() => {
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
    this.auth.signOut();
    this.router.navigate(['login']);
  }

  redirectToError() {
    this.logOut();
  }
}
