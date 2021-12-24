import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Folder {
  _id!: MongooseSchema.Types.ObjectId;

  @Prop()
  name!: string;
}

export type FolderDocument = Folder & Document;

export const FolderSchema = SchemaFactory.createForClass(Folder);
