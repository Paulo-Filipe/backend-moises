import knex from '../../lib/knex.js';
import tableNames from './table-names.js';

const {
  users: Users,
  playlists: Playlists,
  songs: Songs
} = tableNames;

const userOperations = {
  getUserById: async (id) => {
    return await knex(Users).where({ id }).first();
  },
  createUser: async (name, email) => {
    const [newUser] = await knex(Users)
      .returning('*')
      .insert({ name, email });

    return newUser;
  },
  updateUser: async (id, fieldsToUpdate) => {
    return await knex(Users)
      .where({ id })
      .first()
      .update({ ...fieldsToUpdate })
      .returning('*');
  },
  getUserPlaylists: async (id) => {
    return await knex(Playlists)
      .where({
        user_id: id
      })
      .orderBy('name', 'asc')
      .returning('*');
  },
  getUserSongs: async (id) => {
    return await knex(Songs)
      .where({
        user_id: id
      })
      .orderBy('name', 'asc')
      .returning('*');
  }
};

export default userOperations;
