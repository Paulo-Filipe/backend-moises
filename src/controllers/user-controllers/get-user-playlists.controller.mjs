import CacheService from "../../services/cache.service.mjs";
import fullUserPlaylistService from "../../services/user-services/full-user-playlist.service.mjs";
import { playlistCacheKey } from "../controllers.config.mjs";

const getUserPlaylistController = async (userId) => {
    const cachedPlaylists = await CacheService.get(playlistCacheKey, userId);
    
    const playlists = cachedPlaylists ?? await fullUserPlaylistService(userId);

    if (!cachedPlaylists) await CacheService.set(playlistCacheKey, userId, playlists);

    return playlists;
}

export default getUserPlaylistController;
