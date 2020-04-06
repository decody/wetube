import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";     // locals 변수를 global 변수로 사용
    res.locals.routes = routes;
    next();
};
