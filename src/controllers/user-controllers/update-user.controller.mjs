import userOperations from "../../data/user.mjs";
import CacheService from "../../services/cache.service.mjs";
import { userCacheKey } from "../controllers.config.mjs";
import mountUserService from "../../services/user-services/mount-user.service.mjs";

const updateUserInCache = async (userId, valuesToUpdate) => {
    const cachedUser = await CacheService.get(userCacheKey, userId);
    const user = cachedUser ?? await userOperations.getUserById(userId);

    if (!user) throw new Error('User Not Found');

    const updatedUser = {
        ...user,
        ...valuesToUpdate,
        id: userId
    }

    await CacheService.set(userCacheKey, userId, updatedUser);
    return updatedUser;
}

const updateUserController = async (userId, { name, email }) => {
    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (email) fieldsToUpdate.email = email;

    const user = await updateUserInCache(userId, fieldsToUpdate);
    await userOperations.updateUser(userId, fieldsToUpdate);
    return await mountUserService(user);
}

export default updateUserController;
