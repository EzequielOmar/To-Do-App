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
  selectedFolder: any;
  @Input() readonly?: boolean;
  @Input() folders?: any;
  @Output() folderSelect: EventEmitter<string> = new EventEmitter();
  @Output() refreshData: EventEmitter<any> = new EventEmitter();
  @Output() authError: EventEmitter<any> = new EventEmitter();
  @Output() readonlyFalse: EventEmitter<any> = new EventEmitter();
  @ViewChild('modifFolderInput') modifFolderInput?: ElementRef<Input>;

  constructor(private ds: DataService) {}

  updateNames() {
    this.readonlyFalse.emit();
  }

  selectFolder(folder: any) {
    this.selectedFolder === folder
      ? (this.selectedFolder = undefined)
      : (this.selectedFolder = folder);
    this.folderSelect.emit(this.selectedFolder?._id);
  }

  //service calls
  addFolder(input: HTMLInputElement) {
    if (input.value) {
      this.ds.addFolder(input.value).subscribe(
        (res: any) => this.refreshData.emit(),
        (err) => this.authError.emit()
      );
      input.value = '';
    }
  }

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
