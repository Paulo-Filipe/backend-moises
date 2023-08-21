import userOperations from "../../data/user.mjs";
import playlistOperations from "../../data/playlist.mjs";

const fullUserPlaylistService = async(userId) => {
    const playlists = await userOperations.getUserPlaylists(userId);
    const fullPlaylist = await Promise.all(
        playlists.map(
            async (playlist) => {
                const songs = await playlistOperations.getPlaylistSongs(playlist.id);
                return {
                    ...playlist,
                    songs
                }
            }
        )
    )
    
    return fullPlaylist
}

export default fullUserPlaylistService;