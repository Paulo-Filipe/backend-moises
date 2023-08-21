import songOperations from "../../data/song.mjs";
import CacheService from "../../services/cache.service.mjs";
import { songCacheKey } from "../controllers.config.mjs";
import { v4 as uuidv4 } from 'uuid';


const createSongController = async ({ name, userId }) => {
    const id = uuidv4();
    const cachedSongs = await CacheService.get(songCacheKey, userId)

    const newSong = { id, name, userId }
    const newSongList = cachedSongs ?
        [...cachedSongs, newSong] :
        [newSong];

    await CacheService.set(
        songCacheKey,
        userId,
        newSongList.sort((a, b)=> a.name.localeCompare(b.name))
    );
    return await songOperations.createSong(name, userId, id);
}

export default createSongController;
