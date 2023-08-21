import userOperations from "../../data/user.mjs";
import CacheService from "../../services/cache.service.mjs";
import { userCacheKey } from "../controllers.config.mjs";
import mountUserService from "../../services/user-services/mount-user.service.mjs";

const getUserController = async (id) => {
    const cachedUser = await CacheService.get(userCacheKey, id);
    const user = cachedUser ?? await userOperations.getUserById(id);

    if (!cachedUser) await CacheService.set(userCacheKey, id, user);

    return await mountUserService(user);
}

export default getUserController;
