import { Router } from 'express';
import { /* createUserController, */ getAllUserController, getSpecificUsersController, getUserByIdController, modifeRolUserController, modifeUserController } from '../controllers/user.controller.js';
import checkToken from '../middlewares/checkToken.middleware.js';
import { checkRoleAuth } from '../middlewares/checkRoleAuth.middleware.js';
import checkIdNumber from '../middlewares/checkIdNumber.middleware.js';
import checkModifeUserInfo from '../middlewares/checkModifeUserInfo.middleware.js';
const userRouter = Router();

userRouter.get("/",  checkToken, checkRoleAuth([true]), getAllUserController);
userRouter.get("/specifc", checkToken, checkRoleAuth([true]), getSpecificUsersController);
userRouter.put("/rol/:id", checkToken, checkRoleAuth([true]), modifeRolUserController);
userRouter.get("/:id", checkIdNumber, checkToken, checkRoleAuth([true]), getUserByIdController); 
userRouter.put("/:id", checkModifeUserInfo, checkToken, checkRoleAuth([true]), modifeUserController);


export default userRouter;