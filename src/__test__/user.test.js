import request from 'supertest';
import { expect } from 'chai';
import createRandomName from './helpers/randomName.mjs';
import userMutation from './helpers/user-create-mutation.mjs';
import updateMutation from './helpers/user-update-mutation.mjs';
import app from './helpers/app-url.mjs';


describe('GraphQL API - User', () => {
  it('should create a user via the createUser mutation', async () => {
    const mockName = createRandomName(10);

    const response = await request(app)
      .post('/graphql')
      .send({ query: userMutation(mockName) })
      .set('Content-Type', 'application/json');

    const { data } = response.body;
    expect(data.createUser).to.have.property('id').that.is.a('string');
    expect(data.createUser.name).to.equal(mockName);
    expect(data.createUser.email).to.equal(`${mockName}@example.com`);
  });

  it('should edit a user via the updateUser mutation', async () => {
    const mockUserName = createRandomName(10);

    const createResponse = await request(app)
      .post('/graphql')
      .send({ query: userMutation(mockUserName) })
      .set('Content-Type', 'application/json');

    const { data: createData } = createResponse.body;
    const id = createData.createUser.id;

    expect(createData.createUser.email).to.equal(`${mockUserName}@example.com`);

    const mockedNewEmail = createRandomName(5);

    const updateResponse = await request(app)
      .post('/graphql')
      .send({ query: updateMutation(id, `${mockedNewEmail}@test.com`) })
      .set('Content-Type', 'application/json');

    const { data: updatedData } = updateResponse.body;
    expect(updatedData.updateUser.email).to.equal(`${mockedNewEmail}@test.com`);
  });
});