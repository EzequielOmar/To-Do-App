import { Component, OnInit } from '@angular/core';
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
  folders?: any[];
  selectedFid?: string;
  openFolder: boolean = false;
  editFolder: boolean = false;
  //tasks
  selectedTid?: string;
  editTask: boolean = false;
  //ui
  spinner: boolean = false;
  error: string = '';
  errorMessage: string = 'Lo sentimos. Error en la aplicación.';

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

  selectFolder(fid: string) {
    this.selectedFid === fid
      ? (this.selectedFid = undefined)
      : (this.selectedFid = fid);
    this.selectedFid ? (this.openFolder = true) : (this.openFolder = false);
  }

  selectTask(tid: string) {
    this.selectedTid === tid
      ? (this.selectedTid = undefined)
      : (this.selectedTid = tid);
  }

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
    this.editFolder = false;
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
    if (this.selectedFid && input.value) {
      this.ds.addTask(input.value, this.selectedFid).subscribe(
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
    this.editTask = false;
  }

  async deleteTask(tid: string) {
    if (this.selectedFid && tid) {
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
          console.log(this.userData);
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
    this.router.navigate(['auth/error']);
  }
}
