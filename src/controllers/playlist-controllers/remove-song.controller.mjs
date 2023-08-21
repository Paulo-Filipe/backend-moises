import playlistOperations from "../../data/playlist.mjs";
import songOperations from "../../data/song.mjs";
import CacheService from "../../services/cache.service.mjs";
import cacheRemoveSongFromPlaylistService from "../../services/user-services/cache-remove-song-from-playlist.service.mjs";
import { playlistCacheKey } from "../controllers.config.mjs";
import fullUserPlaylistService from "../../services/user-services/full-user-playlist.service.mjs";


const removeSongFromPlaylistController = async (songId, playlistId) => {
    const [playlist, song] = await Promise.all([
        playlistOperations.getPlaylistById(playlistId),
        songOperations.getSongById(songId)
    ]);

    if (!playlist || !song) return;

    const { user_id } = playlist;
    const cachedPlaylists = await CacheService.get(playlistCacheKey, user_id);

    const playlists = cachedPlaylists ?? await fullUserPlaylistService(user_id);

    const updatedPlaylists = cacheRemoveSongFromPlaylistService(
        playlists,
        playlistId,
        songId
    );

    await CacheService.set(
        playlistCacheKey,
        user_id,
        updatedPlaylists
    )

    await playlistOperations.removePlaylistSong(playlistId, songId);
    return updatedPlaylists.find((playlist)=> playlist.id === playlistId);
}

export default removeSongFromPlaylistController;