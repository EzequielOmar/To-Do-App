import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() readonly?: boolean;
  @Input() folder?: any;
  @Output() folderSelect: EventEmitter<any> = new EventEmitter();
  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  @Output() authError: EventEmitter<any> = new EventEmitter();

  constructor(private ds: DataService) {}

  //service calls
  async addTask(input: HTMLInputElement) {
    if (this.folder && input.value) {
      this.ds.addTask(input.value, this.folder._id).subscribe(
        (res: any) => {
          this.refreshData.emit();
        },
        (err) => {
          this.authError.emit();
        }
      );
      input.value = '';
    }
  }

  async modifTask(task: any, newTname: string, done: boolean) {
    this.ds.updateTask(task._id, newTname, done).subscribe(
      (res: any) => {
        this.refreshData.emit();
      },
      (err) => {
        this.authError.emit();
      }
    );
    this.readonly = true;
  }

  async deleteTask(tid: string) {
    if (this.folder && tid) {
      this.ds.deleteTask(tid).subscribe(
        (res: any) => {
          this.refreshData.emit();
        },
        (err) => {
          this.authError.emit();
        }
      );
    }
  }
}
