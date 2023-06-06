/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import DataSource from '../lib/DataSource.js';

export async function createRandomUser() {
  const plainPassword = faker.internet.password();
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  return {
    meta: {
      firstname: faker.internet.userName(),
      lastname: faker.internet.userName(),
      GSM: faker.phone.number(),
      avatar: faker.image.avatar(),
    },
    email: faker.internet.email(),
    password: hashedPassword,
    role: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  };
}

const USERS = [];
const promises = [];
const amountOfUsers = 50;
let i = 0;
while (i < amountOfUsers) {
  promises.push(createRandomUser());
  i++;
}
Promise.all(promises).then((results) => {
  for (i = 0; i < results.length; i++) {
    console.log(results[i]);
    USERS.push(results[i]);
  }
  DataSource.initialize()
    .then(() => {
      const repo = DataSource.getRepository('User');
      // repo.insert(USERS);

      USERS.forEach((user) => {
        console.log('this user will be inserted', user);
        repo.save(user);
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
});
