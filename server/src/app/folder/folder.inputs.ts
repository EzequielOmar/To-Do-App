import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateFolderInput {
  @Field()
  name: string;
}

@InputType()
export class ListFolderInput {
  _id?: MongooseSchema.Types.ObjectId;
  @Field()
  name?: string;
}

@InputType()
export class UpdateFolderInput {
  _id: MongooseSchema.Types.ObjectId;
  @Field()
  name?: string;
}
