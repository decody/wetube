import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/"});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";     // locals 변수를 global 변수로 사용
    res.locals.routes = routes;
    res.locals.user = {
        // 존재하지 않는 더미 로그인 데이터
        isAuthenticated: false,
        id: 1
    };
    next();
};

export const uploadVideo = multerVideo.single("videoFile");