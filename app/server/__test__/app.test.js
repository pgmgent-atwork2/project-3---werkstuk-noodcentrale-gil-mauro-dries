/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import { faker } from '@faker-js/faker';
import DataSource from '../lib/DataSource.js';
import app from '../app.js';

let server;

describe('Testing CRUD functions', () => {
  beforeAll(async () => {
    await DataSource.initialize();

    server = app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/. for testing`
      );
    });
  });
  afterAll(async () => {
    await DataSource.destroy();

    server.close();
  });

  describe('Testing GET of users', () => {
    test('GET request', async () => {
      const res = await request(app).get('/api/users');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('Testing POST of users', () => {
    test('POST request', async () => {
      const res = await request(app)
        .post('/add-user')
        .send({
          firstname: faker.internet.userName(),
          lastname: faker.internet.userName(),
          username: faker.internet.userName(),
          avatar: faker.image.avatar(),
          password: faker.internet.password({ length: 20 }),
          email: faker.internet.email({
            firstName: 'Jeanne',
            lastName: 'Doe',
            provider: 'example.fakerjs.dev',
            allowSpecialCharacters: true,
          }),
        });

      expect(res.statusCode).toBe(302);
    });
  });
});
