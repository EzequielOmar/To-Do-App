import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  constructor(private ds: DataService) {}

  selectFolder(folder: any) {
    this.selectedFolder === folder
      ? (this.selectedFolder = undefined)
      : (this.selectedFolder = folder);
    this.folderSelect.emit(this.selectedFolder?._id);
  }

  //service calls
  async addFolder(input: HTMLInputElement) {
    if (input.value) {
      this.ds.addFolder(input.value).subscribe(
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

  async modifFolder(folder: any, newFname: string) {
    if (newFname && folder.folder !== newFname) {
      this.ds.updateFolder(folder._id, newFname).subscribe(
        (res: any) => {
          this.refreshData.emit();
        },
        (err) => {
          this.authError.emit();
        }
      );
    }
    this.readonly = true;
  }

  async deleteFolder(fid: string) {
    this.ds.deleteFolder(fid).subscribe(
      (res: any) => {
        this.refreshData.emit();
      },
      (err) => {
        this.authError.emit();
      }
    );
  }
}