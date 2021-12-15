import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://eov-todo-api.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private async request(method: string, url: string, data?: any) {
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {},
    });
    return result;
  }

  getFolders() {
    return this.request('get', `${baseUrl}`);
  }

  getTaskByFolder(fid: string) {
    return this.request('get', `${baseUrl}${fid}`);
  }

  newFolder(fName: string) {
    return this.request('post', `${baseUrl}${fName}`);
  }

  newTask(fid: string, task: string) {
    return this.request('post', `${baseUrl}${fid}/${task}`);
  }

  deleteFolder(fId: string) {
    return this.request('delete', `${baseUrl}${fId}`);
  }

  deleteTask(fid: string, task: string) {
    return this.request('delete', `${baseUrl}${fid}/${task}`);
  }

  modifFolder(fid: string, fname: string) {
    return this.request('patch', `${baseUrl}${fid}/${fname}`);
  }

  modifTask(tid: string, task: any) {
    return this.request('patch', `${baseUrl}${tid}`, task);
  }
}
