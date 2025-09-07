import {Client, expect} from '@loopback/testlab';
import {StarterApplication} from '../..';
import {setupApplication} from './test-helper';

describe('Complete flow ', () => {
  let app: StarterApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('creates a user', async () => {
    const user = {
        username: 'testuser',
      email: 'test@example.com',
      password: 'pass1234',
    };
    const res = await client.post('/users/register').send(user).expect(200);
    expect(res.body).to.containDeep({
      token: res.body.token,
      user: {id: res.body.user.id, username: user.username, email: user.email},
    });
  });

  it('logs in a user with email', async () => {
    const user = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'pass1234',
    };
    const res = await client
      .post('/users/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200);
    expect(res.body).to.containDeep({token: res.body.token});
  });
    it('logs in a user with username', async () => {
      const user = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'pass1234',
      };
      const res = await client
        .post('/users/login')
        .send({
          username: user.username,
          password: user.password,
        })
        .expect(200);
      expect(res.body).to.containDeep({token: res.body.token});

      // testea el login en /users/me con un get y el token
      const meRes = await client
        .get('/users/me')
        .set('Authorization', `Bearer ${res.body.token}`)
        .expect(200);
      expect(meRes.body).to.containDeep({
        id: meRes.body.id,
        username: user.username,
        email: user.email,
      });
    });


  it('creates a note for the user', async () => {
    const user = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'pass1234',
    };
    const loginRes = await client
      .post('/users/login')
      .send({
        email: user.email,
        password: user.password,
      });
    const token = loginRes.body.token;

    const note = {
      title: 'Test Note',
      content: 'This is a test note',
    };
    const res = await client
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(note)
      .expect(200);
    expect(res.body).to.containDeep({title: note.title, content: note.content});
  });

 

  it('updates a note for the user', async () => {
    const user = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'pass1234',
    };
    const loginRes = await client
      .post('/users/login')
      .send({
        email: user.email,
        password: user.password,
      });
    const token = loginRes.body.token;

    const note = {
      title: 'Updated Test Note',
      content: 'This is an updated test note',
    };
    const res = await client
      .patch('/notes/1')
      .set('Authorization', `Bearer ${token}`)
      .send(note)
      .expect(204);
  });

  it('gets notes for the user', async () => {
    const user = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'pass1234',
    };
    const loginRes = await client
      .post('/users/login')
      .send({
        email: user.email,
        password: user.password,
      });
    const token = loginRes.body.token;

    const res = await client
      .get('/notes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body).to.be.an.Array();
  });

  it('deletes a user', async () => {
    const user = {
      email: 'test@example.com',
      password: 'pass1234',
    };
    const loginRes = await client
      .post('/users/login')
      .send({
        email: user.email,
        password: user.password,
      });
      // aqui recibe un token de jwt, hay que decodificarlo para obtener el id del usuario
      // y luego usar ese id para eliminar el usuario
      // por simplicidad, asumimos que el id es 1
    const token = loginRes.body.token;

    const res = await client.delete(`/users`).set('Authorization', `Bearer ${token}`).expect(200);
    expect(res.body).to.containDeep({message: 'User deleted successfully'});
  });
});
