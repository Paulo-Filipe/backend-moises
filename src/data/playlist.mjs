import knex from '../../lib/knex.js';
import tableNames from './table-names.js';
const {
    playlists: Playlists,
    playlistSongs: PlaylistSongs,
    songs: Songs
} = tableNames;

const playlistOperations = {
    getPlaylistById: async (id) => {
        return await knex(Playlists).where({ id }).first().returning('*');
    },
    createPlaylist: async (name, userId) => {
        const [newPlaylist] = await knex(Playlists)
            .returning('*')
            .insert({ name, user_id: userId });

        return newPlaylist;
    },
    updatePlaylist: async (id, fieldsToUpdate) => {
        return await knex(Playlists)
            .where({ id })
            .first()
            .update({ ...fieldsToUpdate })
            .returning('*')
    },
    deletePlaylist: async (id) => {
        await Promise.all(
            [
                knex(Playlists)
                    .where({ id })
                    .first()
                    .del(),
                knex(PlaylistSongs)
                    .where({ playlist_id: id })
                    .del()
            ]
        )
    },
    getPlaylistSongs: async (id) => {
        const playlistSongs = await knex(PlaylistSongs)
            .where({ playlist_id: id })
            .returning('song_id');
        

        return await knex(Songs)
            .whereIn('id', playlistSongs.map((song)=> song.song_id))
            .returning('*');
    },
    addSongToPlaylist: async (playlistId, songId) => {
        await knex(PlaylistSongs)
            .insert({
                song_id: songId,
                playlist_id: playlistId
            })
    },
    removePlaylistSong: async (playlistId, songId) => {
        await knex(PlaylistSongs)
            .where({
                playlist_id: playlistId,
                song_id: songId
            })
            .del();
    }
};

export default playlistOperations;
