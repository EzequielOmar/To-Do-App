import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Folder } from '../folder/folder.model';

@ObjectType()
@Schema()
export class Task {
  @Field(() => String)
  _id!: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name!: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  done!: boolean;

  @Field(() => Folder)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Folder.name })
  folder!: Folder;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
