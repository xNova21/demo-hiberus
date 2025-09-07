import {repository} from '@loopback/repository';
import {
  post,
  param,
  getModelSchemaRef,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {User} from '../models';
import {NoteRepository, UserRepository} from '../repositories';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {HttpErrors} from '@loopback/rest';
import {
  TokenServiceBindings,
  MyUserService,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {SecurityBindings, UserProfile, securityId} from '@loopback/security';

import {inject} from '@loopback/core';
import {authenticate, TokenService} from '@loopback/authentication';

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public userProfile: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(NoteRepository)
    public noteRepository: NoteRepository,
     
  ) {}

  @post('/users/register')
  @response(200, {
    description: 'User created',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    try {
      user.password = await bcrypt.hash(
        user.password,
        process.env.BCRYPT_SALT_ROUNDS
          ? parseInt(process.env.BCRYPT_SALT_ROUNDS)
          : 10,
      );
      const existingUser = await this.userRepository.findOne({
        where: {
          or: [{username: user.username}, {email: user.email}],
        },
      });
      if (existingUser) {
        throw new HttpErrors.BadRequest('Username or email already exists');
      }
      return await this.userRepository.create(user);
    } catch (err) {
      console.error('Error al crear usuario:', err);
      throw err;
    }
  }

  @post('/users/login')
  @response(200, {
    description: 'User login',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {type: 'string'},
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {type: 'string'},
              email: {type: 'string'},
              password: {type: 'string'},
            },
            required: ['password'],
          },
        },
      },
    })
    credentials: {
      username?: string;
      email?: string;
      password: string;
    },
  ): Promise<{token: string}> {
    const username = credentials.username ?? undefined;
    const email = credentials.email ?? undefined;
    const password = credentials.password;
    let user: User | null = null;
    if (username) {
      user = await this.userRepository.findOne({where: {username}});
    } else if (email) {
      user = await this.userRepository.findOne({where: {email}});
    }
    if (!user) {
      throw new HttpErrors.Unauthorized('Usuario o contraseña incorrectos');
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('Usuario o contraseña incorrectos');
    }
    // Construir el perfil de usuario para el token (LoopBack espera securityId)
    const userProfile: UserProfile = {
      [securityId]: user.id?.toString() ?? '',
      id: user.id?.toString() ?? '',
      name: user.username,
      email: user.email,
    };
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }

  @authenticate('jwt')
  @del('/users')
  @response(200, {
    description: 'User DELETE success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {type: 'string'},
          },
        },
      },
    },
  })
    
  async deleteById(): Promise<{message: string}> {
    if (!this.userProfile || !this.userProfile.id) {
      throw new HttpErrors.Unauthorized('User profile or user ID is missing');
    }
    const userId = parseInt(this.userProfile.id);
    await this.userRepository.deleteById(userId);
    await this.noteRepository.deleteAll({userId});
    return {message: 'User deleted successfully'};    
  }
}
