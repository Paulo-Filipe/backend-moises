import userOperations from "../../data/user.mjs";
import CacheService from "../../services/cache.service.mjs";
import { userCacheKey } from "../controllers.config.mjs"

const createUserController = async ({ name, email }) => {
    const createdUser = await userOperations.createUser(name, email);
    await CacheService.set(userCacheKey, createdUser.id, createdUser)

    return createdUser;
}

export default createUserController;
