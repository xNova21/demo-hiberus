import {belongsTo, Entity,  model, property} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

@model()
export class Note extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      nullable: 'NO',
      dataScale: 0,
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'title',
      dataType: 'varchar',
      dataLength: 255,
      nullable: 'NO',
    },
  })
  title: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'content', dataType: 'text', nullable: 'YES'},
  })
  content?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {
      columnName: 'created_at',
      dataType: 'timestamp',
      nullable: 'YES',
    },
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    onUpdate: 'now',
    postgresql: {
      columnName: 'updated_at',
      dataType: 'timestamp',
      nullable: 'YES',
    },
  })
  updatedAt?: string;

  @belongsTo(() => User, {
    name: 'user',
    keyFrom: 'userId',
    keyTo: 'id',
  })
  userId: number;

  constructor(data?: Partial<Note>) {
    super(data);
  }
}

export interface NoteRelations {
  user?: UserWithRelations;
}

export type NoteWithRelations = Note & NoteRelations;
