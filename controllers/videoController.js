// export const home = (req, res) => res.send("Home");
export const home = (req, res) => 
    res.render("home", { pageTitle: "Home" });     // /views/home.png 불러옴
export const search = (req, res) => 
    res.render("search", { pageTitle: "Searcj" });
export const upload = (req, res) => 
    res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) => 
    res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) => 
    res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => 
    res.render("deleteVideo", { pageTitle: "Delete Video" });