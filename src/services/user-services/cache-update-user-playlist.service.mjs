import CacheService from "../cache.service.mjs"
import { playlistCacheKey } from "../../controllers/controllers.config.mjs"

const cacheUpdateUserPlaylistService = async ({ playlists, playlistId, song, userId }) => {
    const updatedPlaylist = playlists.reduce(
        (prev, curr)=> {
            if (playlistId === curr.id) {
                const newEntry = {
                    ...curr,
                    songs: [
                        ...curr.songs,
                        song
                    ].sort((a, b)=> a.name.localeCompare(b.name))
                }

                return [...prev, newEntry]
            }
            return [...prev, curr]
        },
        []
    );

    
    await CacheService.set(playlistCacheKey, userId, updatedPlaylist);
    return updatedPlaylist;
}

export default cacheUpdateUserPlaylistService;