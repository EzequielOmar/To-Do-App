import { Component } from '@angular/core';
import { TaskService } from './services/task-service/task.service';

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
  allTasks?: any[];
  selectedTid?: string;
  editTask: boolean = false;

  constructor(private ts: TaskService) {
    this.getFolders();
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
      (await this.ts.newFolder(input.value)).subscribe();
      input.value = '';
      this.refresh();
    }
  }

  async addTask(input: HTMLInputElement) {
    if (this.selectedFid && input.value) {
      (await this.ts.newTask(this.selectedFid, input.value)).subscribe();
      input.value = '';
      this.refresh();
    }
  }

  async modifFolder(folder: any, newFname: string) {
    if (newFname && folder.folder !== newFname) {
      folder.folder = newFname;
      (await this.ts.modifFolder(folder._id, newFname)).subscribe();
    }
    this.editFolder = false;
  }

  async modifTask(task: any, newTname: string, done: boolean) {
    if (newTname) task.task = newTname;
    if (done) task.done = !task.done;
    if (newTname || done) (await this.ts.modifTask(task._id, task)).subscribe();
    this.editTask = false;
  }

  async deleteFolder(fid: string) {
    (await this.ts.deleteFolder(fid)).subscribe();
    this.refresh();
  }

  async deleteTask(tid: string) {
    if (this.selectedFid && tid) {
      (await this.ts.deleteTask(this.selectedFid, tid)).subscribe();
      this.refresh();
    }
  }

  private refresh() {
    setTimeout(() => {
      this.getFolders();
    }, 500);
  }

  private async getFolders() {
    this.folders = [];
    (await this.ts.getFolders()).toPromise().then((data: any) => {
      this.folders = data;
      this.getTasks();
    });
  }

  private async getTasks() {
    this.allTasks = [];
    this.folders?.forEach(async (f) => {
      let t: any = [];
      (await this.ts.getTaskByFolder(f._id)).subscribe((data: any) => {
        t.push(...data);
        f.count = t.length;
        this.allTasks?.push(...t);
      });
    });
  }
}
