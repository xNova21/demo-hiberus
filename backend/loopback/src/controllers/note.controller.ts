import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Note} from '../models';
import {NoteRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';

@authenticate('jwt')
export class NoteController {
  constructor(
    @repository(NoteRepository)
    public noteRepository: NoteRepository,
    @inject(SecurityBindings.USER)
    private userProfile: UserProfile,
  ) {}

  @post('/notes')
  @response(200, {
    description: 'Note model instance',
    content: {'application/json': {schema: getModelSchemaRef(Note)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {
            exclude: ['id', 'userId'],
          }),
        },
      },
    })
    note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>,
  ): Promise<Note> {
    console.log('User profile:', this.userProfile); // Añadido para depuración
    if (!this.userProfile || !this.userProfile.id) {
      throw new Error('User profile or user ID is missing');
    }
    const userId = this.userProfile.id;
    return this.noteRepository.create({...note, userId});
  }

  @get('/notes')
  @response(200, {
    description: 'Array of Note model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Note, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Note) filter?: Filter<Note>): Promise<Note[]> {
    return this.noteRepository.find(filter);
  }



  @patch('/notes/{id}')
  @response(204, {
    description: 'Note PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {partial: true}),
        },
      },
    })
    note: Note,
  ): Promise<void> {
    await this.noteRepository.updateById(id, note);
  }

  @put('/notes/{id}')
  @response(204, {
    description: 'Note PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() note: Note,
  ): Promise<void> {
    await this.noteRepository.replaceById(id, note);
  }

  @del('/notes/{id}')
  @response(204, {
    description: 'Note DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.noteRepository.deleteById(id);
  }
}
