import userOperations from "../../data/user.mjs";
import CacheService from "../../services/cache.service.mjs";
import { songCacheKey } from "../controllers.config.mjs";


const getUserSongsController = async (userId) => {
    const cachedSongs = await CacheService.get(songCacheKey, userId);

    const songs = cachedSongs ?? await userOperations.getUserSongs(userId);

    if (!cachedSongs) await CacheService.set(songCacheKey, userId, songs);

    return songs;
}

export default getUserSongsController;
