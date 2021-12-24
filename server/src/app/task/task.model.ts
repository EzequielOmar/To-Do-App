import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Folder } from '../folder/folder.model';

@Schema()
export class Task {
  _id!: MongooseSchema.Types.ObjectId;

  @Prop()
  name!: string;

  @Prop({ default: false })
  done!: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Folder.name })
  folder!: MongooseSchema.Types.ObjectId;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
