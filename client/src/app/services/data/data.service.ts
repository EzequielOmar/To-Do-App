import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { findDangerousChanges } from 'graphql';
import { SessionService } from '../session/session.service';
import {
  DELETE_FOLDER_MUTATION,
  DELETE_TASK_MUTATION,
  GET_ALL_DATA_QUERY,
  NEW_FOLDER_MUTATION,
  NEW_TASK_MUTATION,
  UPDATE_FOLDER_MUTATION,
  UPDATE_TASK_MUTATION,
} from './data.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private apollo: Apollo, private session: SessionService) {}

  getData() {
    return this.apollo
      .watchQuery({
        query: GET_ALL_DATA_QUERY,
      })
      .refetch();
  }

  addFolder(folderName: string) {
    return this.apollo.mutate({
      mutation: NEW_FOLDER_MUTATION,
      variables: { name: folderName },
    });
  }

  updateFolder(fid: string, newName: string) {
    return this.apollo.mutate({
      mutation: UPDATE_FOLDER_MUTATION,
      variables: { id: fid, name: newName },
    });
  }

  deleteFolder(fid: string) {
    return this.apollo.mutate({
      mutation: DELETE_FOLDER_MUTATION,
      variables: { id: fid },
    });
  }

  addTask(name: string, folder: string) {
    return this.apollo.mutate({
      mutation: NEW_TASK_MUTATION,
      variables: { name: name, folder: folder },
    });
  }

  updateTask(tid: string, newName: string, done: boolean) {
    return this.apollo.mutate({
      mutation: UPDATE_TASK_MUTATION,
      variables: { id: tid, name: newName, done: done },
    });
  }

  deleteTask(tid: string) {
    return this.apollo.mutate({
      mutation: DELETE_TASK_MUTATION,
      variables: { id: tid },
    });
  }
}
