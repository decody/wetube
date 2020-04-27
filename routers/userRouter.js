import express from "express";
import routes from "../routes";
import { 
    userDetail, 
    getEditProfile,
    getChangePassword,
    postEditProfile,
    postChangePassword
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

// routes.editProfile이 routes.userDetail보다 상단에 있어야함
// /edit-profile을 /:id로 인식하는 오류 발생
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);      // :id를 인자로 routes.js의 userDetail() 함수로 넘김

export default userRouter;