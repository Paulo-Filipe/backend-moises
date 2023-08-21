import knex from '../../lib/knex.js';
import tableNames from './table-names.js';
const { songs: Songs, playlistSongs: PlaylistSongs } = tableNames;

const songOperations = {
  getSongById: async (id) => {
    return await knex(Songs).where({ id }).first().returning('*');
  },
  createSong: async (name, userId, id) => {
    const [newSong] = await knex(Songs)
      .returning('*')
      .insert({ name, user_id: userId, id });

    return newSong;
  },
  updateSong: async (id, fieldsToUpdate) => {
    return await knex(Songs)
      .where({ id })
      .first()
      .update({ ...fieldsToUpdate })
      .returning('*')
  },
  deleteSong: async (id) => {
    await Promise.all(
      [
        knex(Songs)
          .where({ id })
          .first()
          .del(),

        knex(PlaylistSongs)
          .where({ song_id: id })
          .del()
      ]
    )
  }
};

export default songOperations;
