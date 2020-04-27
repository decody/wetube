import routes from "../routes";
import { videos } from "../db";     // mongoDB로 연결하기전 json형의 fakeDB로 연결
import Video from "../models/Video";
import Comment from "../models/Comment";
// import { restart } from "nodemon";

// Home

export const home = async (req, res) => {
    try {
        // const videos = await Video.find({}).sort({ _id: -1 });
        // const videos = [
        //     {
        //         id: 324393,
        //         title: "Video awesome",
        //         description: "This is something I love",
        //         views: 24,
        //         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        //         creator: {
        //         id: 121212,
        //         name: "Nicolas",
        //         email: "nico@las.com"
        //         }
        //     },
        //     {
        //         id: 1212121,
        //         title: "Video super",
        //         description: "This is something I love",
        //         views: 24,
        //         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        //         creator: {
        //         id: 121212,
        //         name: "Nicolas",
        //         email: "nico@las.com"
        //         }
        //     },
        //     {
        //         id: 55555,
        //         title: "Video nice",
        //         description: "This is something I love",
        //         views: 24,
        //         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        //         creator: {
        //         id: 121212,
        //         name: "Nicolas",
        //         email: "nico@las.com"
        //         }
        //     },
        //     {
        //         id: 23423,
        //         title: "Video nice",
        //         description: "This is something I love",
        //         views: 24,
        //         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        //         creator: {
        //         id: 121212,
        //         name: "Nicolas",
        //         email: "nico@las.com"
        //         }
        //     },
        //     {
        //         id: 11111,
        //         title: "Video perfect",
        //         description: "This is something I love",
        //         views: 24,
        //         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        //         creator: {
        //         id: 121212,
        //         name: "Nicolas",
        //         email: "nico@las.com"
        //         }
        //     }
        // ];
        if (Video == [] || Video == null || Video == "undefined") {
            console.log("Video Model did not connect from MongoDB");
        }
        const videos = await Video.find({}).sort({ _id: -1 });
        res.render("home", { pageTitle: "Home", videos });     // /views/home.pug 불러옴
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] })
    }
}

// Search
    
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

// Upload

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
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    // res.render("upload", { pageTitle: "Upload" });
    res.redirect(routes.videoDetail(newVideo.id));
};  

// Video Detail

export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        // const video = await Video.findById(id);
        // const video = await Video.findById(id).populate("creator");
        const video = await Video.findById(id)
            .populate("creator")
            .populate("comments");
        console.log(video);
        res.render("videoDetail", { pageTitle: video.title, video });    
    } catch (error) {
        res.redirect(routes.home);
    }
};

// Edit Video
    
export const getEditVideo = async (req, res) => {
    const {
      params: { id }
    } = req;
    try {
      const video = await Video.findById(id);
      if (String(video.creator) !== req.user.id) {
        throw Error();
      } else {
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
      }
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

// Delete Video

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Video.findOneAndRemove({ _id: id });
        const video = await Video.findById(id);
        if (String(video.creator) !== req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndRemove({ _id: id });
        }
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
    const { 
        params: { id } 
    } = req;
    try {
        const video = await Video.findById(id);
        video.views = video.views + 1;
        video.save();
        res.status(200);
    } catch (error) {  
        res.status(400);
    } finally {
        res.end();
    }
};

// Add Comment

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
        user
    } = req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        });
        video.comments.push(newComment.id);
        video.save();
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};