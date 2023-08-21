import request from 'supertest';
import { expect } from 'chai';
import createRandomName from './helpers/randomName.mjs';
import userCreateMutation from './helpers/user-create-mutation.mjs';
import songCreateMutation from './helpers/song-create-mutation.mjs';
import app from './helpers/app-url.mjs'
import songDeleteMutation from './helpers/song-delete-mutation.mjs';


describe('GraphQL API - Song', () => {
    it('should create a Song via the createSong mutation', async () => {
        const mockUserName = createRandomName(10);

        const userResponse = await request(app)
            .post('/graphql')
            .send({ query: userCreateMutation(mockUserName) })
            .set('Content-Type', 'application/json');

        const { data: { createUser: { id: userId } } } = userResponse.body;

        const mockSongName = createRandomName(10);

        const songResponse = await request(app)
            .post('/graphql')
            .send({ query: songCreateMutation(userId, mockSongName) })
            .set('Content-Type', 'application/json');

        const { data } = songResponse.body;

        expect(data.createSong).to.have.property('id').that.is.a('string');
        expect(data.createSong.name).to.equal(mockSongName);
    });

    it('Should delete a Song with the deleteSong Mutation', async () => {
        const mockUserName = createRandomName(10);

        const userResponse = await request(app)
            .post('/graphql')
            .send({ query: userCreateMutation(mockUserName) })
            .set('Content-Type', 'application/json');

        const { data: { createUser: { id: userId } } } = userResponse.body;

        const mockSongName = createRandomName(10);

        const songResponse = await request(app)
            .post('/graphql')
            .send({ query: songCreateMutation(userId, mockSongName) })
            .set('Content-Type', 'application/json');

        const { data: { createSong: { id: songId } } } = songResponse.body;


        const deleteResponse = await request(app)
            .post('/graphql')
            .send({ query: songDeleteMutation(songId) })
            .set('Content-Type', 'application/json');

        const { data } = deleteResponse.body;

        expect(data.deleteSong).to.equal(true);
    });
});