import playlistOperations from "../../data/playlist.mjs";
import songOperations from "../../data/song.mjs";
import CacheService from "../../services/cache.service.mjs";
import cacheUpdateUserPlaylistService from "../../services/user-services/cache-update-user-playlist.service.mjs";
import fullUserPlaylistService from "../../services/user-services/full-user-playlist.service.mjs";
import { playlistCacheKey } from "../controllers.config.mjs";

const addSongToPlaylistController = async (songId, playlistId) => {
    const [playlist, song] = await Promise.all([
        playlistOperations.getPlaylistById(playlistId),
        songOperations.getSongById(songId)
    ]);

    if(!playlistId || !songId) return;

    const { user_id } = playlist;

    const cachedUserPlaylists = await CacheService.get(playlistCacheKey, user_id);

    const playlists = cachedUserPlaylists ?? await fullUserPlaylistService(playlist.user_id);

    const updatedPlaylists = await cacheUpdateUserPlaylistService({ 
        playlists,
        playlistId,
        userId: user_id,
        song,
    })

    await playlistOperations.addSongToPlaylist(playlistId, songId);

    return updatedPlaylists.find((playlist) => playlist.id === playlistId);
}

export default addSongToPlaylistController;