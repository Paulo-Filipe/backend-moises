import getUserSongsController from "../../controllers/user-controllers/get-user-songs.controller.mjs";
import getUserPlaylistController from "../../controllers/user-controllers/get-user-playlists.controller.mjs";

const mountUserService = async (user) => {
    const [
        songs, playlists
    ] = await Promise.all([
        getUserSongsController(user.id),
        getUserPlaylistController(user.id)
    ]);

    return { ...user, songs, playlists }
}

export default mountUserService;