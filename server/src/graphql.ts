
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateFolderInput {
    name: string;
}

export class ListFolderInput {
    _id?: Nullable<string>;
    name?: Nullable<string>;
}

export class UpdateFolderInput {
    _id: string;
    name: string;
}

export class CreateTaskInput {
    name: string;
    folder: string;
}

export class ListTaskInput {
    _id?: Nullable<string>;
    name?: Nullable<string>;
    done?: Nullable<boolean>;
    folder?: Nullable<string>;
}

export class UpdateTaskInput {
    _id: string;
    name?: Nullable<string>;
    done?: Nullable<boolean>;
}

export class Folder {
    _id: string;
    name: string;
    ftasks: Task[];
}

export abstract class IMutation {
    abstract createFolder(payload: CreateFolderInput): Folder | Promise<Folder>;

    abstract deleteFolder(_id: string): Folder | Promise<Folder>;

    abstract updateFolder(payload: UpdateFolderInput): Folder | Promise<Folder>;

    abstract createTask(payload: CreateTaskInput): Task | Promise<Task>;

    abstract deleteTask(_id: string): Task | Promise<Task>;

    abstract updateTask(payload: UpdateTaskInput): Task | Promise<Task>;
}

export abstract class IQuery {
    abstract folders(filters?: Nullable<ListFolderInput>): Folder[] | Promise<Folder[]>;

    abstract tasks(filters?: Nullable<ListTaskInput>): Task[] | Promise<Task[]>;
}

export class Task {
    _id: string;
    name: string;
    done: boolean;
    folder: string;
}

type Nullable<T> = T | null;
