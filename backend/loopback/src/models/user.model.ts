import {Entity, hasMany, model, property} from '@loopback/repository';
import { Note, NoteWithRelations } from './note.model';

@model({
    settings: {
      postgresql: {schema: 'public', table: 'users'},
      indexes: {
        uniqueUsername: {
          keys: {username: 1},
          options: {unique: true},
        },
        uniqueEmail: {
          keys: {email: 1},
          options: {unique: true},
        },
      },
    },
})
export class User extends Entity {
  @property({
    type: 'number',
    generated: true,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
      
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    unique: true,
    postgresql: {
      columnName: 'username',
      dataType: 'varchar',
      dataLength: 30,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  username: string;

  @property({
    type: 'string',
    required: true,
    unique: true,
    postgresql: {
      columnName: 'email',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'password',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  password: string;

  @hasMany(() => Note, {keyTo: 'userId'})
  notes: Note[];
}

export interface UserRelations {
  notes: NoteWithRelations[];
}

export type UserWithRelations = User & UserRelations;