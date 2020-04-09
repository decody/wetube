import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { 
    getJoin,
    postJoin, 
    getLogin, 
    postLogin, 
    logout 
} from "../controllers/userController";

const globalRouter = express.Router();

// globalRouter.get(routes.home, (req, res) => res.send("Home"));
// globalRouter.get(routes.search, (req, res) => res.send("Search"));
// videoController.js와 userController.js에서 각 처리기능들을 불러옴

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;