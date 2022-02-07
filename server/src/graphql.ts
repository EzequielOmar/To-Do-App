
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UpdateFolderInput {
    _id: string;
    name: string;
}

export class CreateTaskInput {
    name: string;
    folder: string;
}

export class UpdateTaskInput {
    _id: string;
    name?: Nullable<string>;
    done?: Nullable<boolean>;
}

export class Folder {
    _id: string;
    name: string;
    owner: string;
    ftasks: Nullable<Task>[];
}

export abstract class IMutation {
    abstract createFolder(name: string): Folder | Promise<Folder>;

    abstract deleteFolder(_id: string): Nullable<Folder> | Promise<Nullable<Folder>>;

    abstract updateFolder(payload: UpdateFolderInput): Folder | Promise<Folder>;

    abstract createTask(payload: CreateTaskInput): Task | Promise<Task>;

    abstract deleteTask(_id: string): Nullable<Task> | Promise<Nullable<Task>>;

    abstract updateTask(payload: UpdateTaskInput): Task | Promise<Task>;

    abstract deleteUser(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IQuery {
    abstract folders(owner: string): Nullable<Folder>[] | Promise<Nullable<Folder>[]>;

    abstract tasks(folder: string): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract User(): User | Promise<User>;
}

export class Task {
    _id: string;
    name: string;
    done: boolean;
    folder: string;
}

export class User {
    _id: string;
    name: string;
    ufolders: Nullable<Folder>[];
}

type Nullable<T> = T | null;
