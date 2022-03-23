import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent {
  openFolders: string[] = [];
  @Input() readonly?: boolean;
  @Input() folders?: any;
  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  @Output() authError: EventEmitter<any> = new EventEmitter();
  @Output() readonlyFalse: EventEmitter<any> = new EventEmitter();
  @ViewChild('modifFolderInput') modifFolderInput?: ElementRef<Input>;

  constructor(private ds: DataService) {}

  updateNames() {
    this.readonlyFalse.emit();
  }

  emitRefreshData() {
    this.refreshData.emit();
  }

  emitAuthError() {
    this.authError.emit();
  }

  openFolder(folder: any) {
    if (this.openFolders.includes(folder._id))
      this.openFolders.splice(this.openFolders.indexOf(folder._id), 1);
    else this.openFolders.push(folder._id);
  }

  getDoneTasks(folder: any) {
    const doneTasks = folder.ftasks.filter((t: any) => t.done);
    return doneTasks.length;
  }

  //service calls
  modifFolder(folder: any, newFname: string) {
    if (newFname && folder.folder !== newFname) {
      this.ds.updateFolder(folder._id, newFname).subscribe(
        (res: any) => this.refreshData.emit(),
        (err) => this.authError.emit()
      );
    }
  }

  deleteFolder(fid: string) {
    this.ds.deleteFolder(fid).subscribe(
      (res: any) => this.refreshData.emit(),
      (err) => this.authError.emit()
    );
  }
}
