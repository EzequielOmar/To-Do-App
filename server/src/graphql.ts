
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

export class Folder {
    _id: string;
    name: string;
}

export abstract class IMutation {
    abstract createFolder(payload: CreateFolderInput): Folder | Promise<Folder>;

    abstract deleteFolder(_id: string): Folder | Promise<Folder>;

    abstract updateFolder(payload: UpdateFolderInput): Folder | Promise<Folder>;
}

export abstract class IQuery {
    abstract folders(filters?: Nullable<ListFolderInput>): Folder[] | Promise<Folder[]>;
}

type Nullable<T> = T | null;
