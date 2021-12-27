import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'to-do-app';
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

  constructor(private ds: DataService) {
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
          this.setError();
        }
      );
      input.value = '';
    }
  }

  async addTask(input: HTMLInputElement) {
    if (this.selectedFid && input.value) {
      this.ds.addTask(input.value, this.selectedFid).subscribe(
        (res: any) => {
          this.getData();
        },
        (err) => {
          this.setError();
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
          this.setError();
        }
      );
    }
    this.editFolder = false;
  }

  async modifTask(task: any, newTname: string, done: boolean) {
    this.ds.updateTask(task._id, newTname, done).subscribe(
      (res: any) => {
        console.log(res);
        this.getData();
      },
      (err) => {
        console.log(err);
        this.setError();
      }
    );
    this.editTask = false;
  }

  async deleteFolder(fid: string) {
    this.ds.deleteFolder(fid).subscribe(
      (res: any) => {
        this.getData();
      },
      (err) => {
        this.setError();
      }
    );
  }

  async deleteTask(tid: string) {
    if (this.selectedFid && tid) {
      this.ds.deleteTask(tid).subscribe(
        (res: any) => {
          this.getData();
        },
        (err) => {
          this.setError();
        }
      );
    }
  }

  private async getData() {
    this.spinner = true;
    this.ds
      .getData()
      .refetch()
      .then((res: any) => {
        this.folders = [];
        this.folders?.push(...res?.data?.folders);
        if (res.error) this.setError();
        this.spinner = false;
      });
  }

  private setError() {
    this.error = this.errorMessage;
  }
}
