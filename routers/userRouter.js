import express from "express";
import routes from "../routes";
import { 
    users, 
    userDetail, 
    editProfile, 
    changePassword 
} from "../controllers/userController";

const userRouter = express.Router();

// routes.editProfile이 routes.userDetail보다 상단에 있어야함
// /edit-profile을 /:id로 인식하는 오류 발생
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.userDetail, userDetail);      
userRouter.get(routes.changePassword, changePassword);

export default userRouter;