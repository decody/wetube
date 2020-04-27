import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/"});
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";     // locals 변수를 global 변수로 사용
    res.locals.routes = routes;
    // res.locals.user = {
    //     // 존재하지 않는 더미 로그인 데이터
    //     isAuthenticated: false,
    //     id: 1
    // };
    // res.locals.user = req.user || null;
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next(); 
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");