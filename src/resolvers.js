import {
  createSongController, deleteSongController
} from './controllers/song-controllers/index.mjs';
import {
  getUserController,
  getUserSongsController,
  createUserController,
  getUserPlaylistController,
  updateUserController
} from './controllers/user-controllers/index.mjs';

import {
  createPlaylistController,
  deletePlaylistController,
  addSongToPlaylistController,
  removeSongFromPlaylistController
} from "./controllers/playlist-controllers/index.mjs"

const resolvers = {
  Query: {
    user: async (_parent, { id }) => {
      return await getUserController(id);
    },
    songs: async (_parent, { userId }) => {
      return await getUserSongsController(userId);
    },
    playlists: async (_parent, { userId }) => {
      return await getUserPlaylistController(userId);
    },
  },
  Mutation: {
    createUser: async (_parent, { name, email }) => {
      return await createUserController({ name, email });
    },
    updateUser: async (_parent, { id: userId, name, email }) => {
      return await updateUserController(userId, { name, email });
    },

    createPlaylist: async (_parent, { userId, name }) => {
      return await createPlaylistController({ name,  userId });
    },
    deletePlaylist: async (_parent, { id: playlistId }) => {
      return await deletePlaylistController(playlistId);
    },

    createSong: async (_parent, { userId, name }) => {
      return await createSongController({ name, userId });
    },
    deleteSong: async (_parent, { id: songId }) => {
      return await deleteSongController(songId);
    },

    addSongToPlaylist: async (_parent, { songId, playlistId }) => {
      return await addSongToPlaylistController(songId, playlistId);
    },
    removeSongFromPlaylist: async (_parent, { songId, playlistId }) => {
      return await removeSongFromPlaylistController(songId, playlistId);
    }
  },
};

export default resolvers;
