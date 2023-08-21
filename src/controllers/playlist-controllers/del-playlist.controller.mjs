import playlistOperations from "../../data/playlist.mjs";
import CacheService from "../../services/cache.service.mjs";
import { playlistCacheKey } from "../controllers.config.mjs";

const deletePlaylistController = async (playlistId) => {
    const playlist = await playlistOperations.getPlaylistById(playlistId);

    if (!playlist) return true;

    const { user_id } = playlist;
    const cachedPlaylists = await CacheService.get(playlistCacheKey, user_id);

    if(cachedPlaylists) await CacheService.set(
        playlistCacheKey,
        user_id,
        cachedPlaylists.filter(
            (playlist) => playlist.id !== playlistId
        )
    );

    return playlistOperations.deletePlaylist(playlistId).then(() => true);

}

export default deletePlaylistController;