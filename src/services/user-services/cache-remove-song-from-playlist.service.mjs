const cacheRemoveSongFromPlaylistService = (playlists, playlistId, songId) => {
    return playlists.map(
        (playlist) => {
            return {
                ...playlist,
                songs: playlist.id !== playlistId ?
                    playlist.songs :
                    playlist.songs.filter(
                        (song) => song.id !== songId
                    )
            }
        }
    )
}

export default cacheRemoveSongFromPlaylistService;