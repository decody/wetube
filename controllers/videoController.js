import { videos } from "../db";     // mongoDB로 연결하기전 json형의 fakeDB로 연결
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({"_id": -1 });
        res.render("home", { pageTitle: "Home", videos });     // /views/home.pug 불러옴
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] })
    }
}
    
export const search = async (req, res) => {
    // console.log(req.query.term);
    // const searchingBy = req.query.term;
    const {
        query: { term: searchingBy }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({title: { $regex: searchingBy, $option: "i" }})
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos }); // es6에서 key:value가 같으면 key값만 쓸 수 있음
    // res.render("search", { pageTitle: "Search", searchingBy: searchingBy });
}

export const getUpload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });
    
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;
    // console.log(body, file);
    // to do: upload and save video
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log(newVideo);
    // res.render("upload", { pageTitle: "Upload" });
    res.redirect(routes.videoDetail(newVideo.id));
};  

export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        res.redirect(routes.home);
    }
};
    
export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Video.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};
    