import playlistOperations from "../../data/playlist.mjs";
import CacheService from "../../services/cache.service.mjs";
import { playlistCacheKey } from "../controllers.config.mjs";

const createPlaylistController = async ({ name, userId }) => {
    const id = uuidv4();
    const cachedPlaylists = await CacheService.get(playlistCacheKey, userId);
    const newPlaylist = { id, name, userId };

    const newPlaylistsList = cachedPlaylists ?
        [...cachedPlaylists, { ...newPlaylist, songs: [] }] :
        [{ ...newPlaylist, songs: [] }];

    await CacheService.set(playlistCacheKey, userId, newPlaylistsList);

    const createdPlaylist = await playlistOperations.createPlaylist(name, userId);

    return createdPlaylist;
}

export default createPlaylistController;
