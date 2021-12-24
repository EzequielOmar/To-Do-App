import { InputType, Field } from '@nestjs/graphql';
import { Folder } from '../folder/folder.model';
//import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateTaskInput {
  @Field()
  name: string;
  //@Field()
  //done: boolean;
  @Field()
  folder: Folder;
}

@InputType()
export class ListTaskInput {
  @Field()
  _id?: string;
  @Field()
  name?: string;
  @Field()
  done?: string;
  @Field()
  folder?: Folder;
}

@InputType()
export class UpdateTaskInput {
  @Field()
  _id: string;
  @Field()
  name?: string;
  @Field()
  done?: string;
}
