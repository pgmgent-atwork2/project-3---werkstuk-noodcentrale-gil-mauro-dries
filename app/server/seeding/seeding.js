/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import DataSource from '../lib/DataSource.js';

export function createRandomUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement([1, 2, 3]),
  };
}

const USERS = [];
for (let i = 0; i < 50; i++) {
  USERS.push(createRandomUser());
}

DataSource.initialize()
  .then(() => {
    const repo = DataSource.getRepository('User');
    repo.insert(USERS);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
