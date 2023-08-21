import songOperations from "../../data/song.mjs";
import CacheService from "../../services/cache.service.mjs";
import { songCacheKey } from "../controllers.config.mjs";

const deleteSongController = async (songId) => {
    const song = await songOperations.getSongById(songId);
    if (!song) return;

    const { user_id } = song;

    const cachedSongs = await CacheService.get(songCacheKey, user_id);
    if (cachedSongs) {
        await CacheService.set(
            songCacheKey,
            user_id,
            cachedSongs.filter(
                (song) => song.id !== songId
            )
        )
    }

    return await songOperations.deleteSong(songId).then(()=> true);
}

export default deleteSongController;