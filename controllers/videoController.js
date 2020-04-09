// export const home = (req, res) => res.send("Home");
import { videos } from "../db";     // mongoDB로 연결하기전 fakeDB임

export const home = (req, res) => {
    res.render("home", { pageTitle: "Home", videos });     // /views/home.pug 불러옴
}
    
export const search = (req, res) => {
    console.log(req.query.term);
    // const searchingBy = req.query.term;
    const {
        query: { term: searchingBy }
    } = req;
    res.render("search", { pageTitle: "Search", searchingBy, videos }); // es6에서 key:value가 같으면 key값만 쓸 수 있음
    // res.render("search", { pageTitle: "Search", searchingBy: searchingBy });
}
    
export const upload = (req, res) => 
    res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) => 
    res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) => 
    res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => 
    res.render("deleteVideo", { pageTitle: "Delete Video" });