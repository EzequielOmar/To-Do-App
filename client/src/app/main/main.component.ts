import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  userData?: any;
  //folders
  //folders?: any[];
  //selectedFid?: string;
  //openFolder: boolean = false;
  //tasks
  //selectedTid?: string;
  //ui
  spinner: boolean = false;

  readonly: boolean = true;
  selectedFolder: any;

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

  selectFolder(folder: any) {
    this.selectedFolder === folder
      ? (this.selectedFolder = undefined)
      : (this.selectedFolder = folder);
  }

  //selectTask(tid: string) {
  //  this.selectedTid === tid
  //    ? (this.selectedTid = undefined)
  //    : (this.selectedTid = tid);
  //}

  //service calls
  async addFolder(input: HTMLInputElement) {
    if (input.value) {
      this.ds.addFolder(input.value).subscribe(
        (res: any) => {
          this.getData();
        },
        (err) => {
          this.redirectToError();
        }
      );
      input.value = '';
    }
  }

  async modifFolder(folder: any, newFname: string) {
    if (newFname && folder.folder !== newFname) {
      this.ds.updateFolder(folder._id, newFname).subscribe(
        (res: any) => {
          this.getData();
        },
        (err) => {
          this.redirectToError();
        }
      );
    }
    this.readonly = true;
  }

  async deleteFolder(fid: string) {
    this.ds.deleteFolder(fid).subscribe(
      (res: any) => {
        this.getData();
      },
      (err) => {
        this.redirectToError();
      }
    );
  }

  async addTask(input: HTMLInputElement) {
    if (this.selectedFolder && input.value) {
      this.ds.addTask(input.value, this.selectedFolder._id).subscribe(
        (res: any) => {
          this.getData();
        },
        (err) => {
          this.redirectToError();
        }
      );
      input.value = '';
    }
  }

  async modifTask(task: any, newTname: string, done: boolean) {
    this.ds.updateTask(task._id, newTname, done).subscribe(
      (res: any) => {
        this.getData();
      },
      (err) => {
        this.redirectToError();
      }
    );
    this.readonly = true;
  }

  async deleteTask(tid: string) {
    if (this.selectedFolder && tid) {
      this.ds.deleteTask(tid).subscribe(
        (res: any) => {
          this.getData();
        },
        (err) => {
          this.redirectToError();
        }
      );
    }
  }

  private async getData() {
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
   * Chequea si hay una sesion abierta
   * intenta loguear pasandole la url con posible token de acceso
   * si ambas fallan redirecciona al login
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

  /**
   * Cierra la sesion (elimina variables del sessionstorage)
   * y redirecciona al login mostrando el mensaje de error por sesion expirada
   */
  private redirectToError() {
    this.session.forceLogOut();
    this.router.navigate(['login']);
  }
}
