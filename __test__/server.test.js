'use strict';

const { app } = require('../src/server');
const { db } = require('../src/auth/models/index');
const supertest = require('supertest');

const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Server test', () => {
  it('Signup', async () => {
    let response = await request.post('/signup').send({
      username: 'test',
      password: 'test',
    });

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('test');
  });

  it('Signin', async () => {
    let response = await request.post('/signin').send({
      
    });
  })
});
