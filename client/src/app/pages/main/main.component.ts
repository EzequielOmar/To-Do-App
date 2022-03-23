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
  readonly: boolean = true;
  @ViewChild('folderList') folderList?: FolderListComponent;
  @ViewChild('taskList') taskList?: TaskListComponent;
  @ViewChild('modifUserName') modifUserName?: ElementRef<Input>;

  constructor(private ds: DataService, private auth: AuthService) {}

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

  //service calls
  addFolder(input: HTMLInputElement) {
    if (input.value) {
      this.ds.addFolder(input.value).subscribe(
        (res: any) => this.getData(),
        (err) => this.accessTokenExpired()
      );
      input.value = '';
    }
  }

  updateUserName(name: string) {
    this.ds.updateUserName(name).subscribe(
      (res: any) => this.getData(),
      (err) => this.accessTokenExpired()
    );
  }

  deleteUser() {
    this.ds.deleteUser().subscribe((e: any) => {
      if (Object.keys(e.data)[0] === 'deleteUser') this.logOut();
    });
  }

  logOut() {
    this.auth.signOut();
  }

  accessTokenExpired() {
    this.auth.reloadTokens();
  }

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
      this.accessTokenExpired();
    }
  }
}
