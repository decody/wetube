import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
    // console.log(req.body);
    const {
        body: { name, email, password, password2 }
    } = req;
    if (password !== password2) {
        res.status(400);    // 400: bad request
        res.render("join", { pageTitle: "Join" });
    } else {
        // to do: register user
        // to do: log user in
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};

export const postLogin = (req,res) => {
    // 로그인시 db의 비밀번호와 비교하여 true면 Home으로, error가 있으면 login 화면 표시
    res.redirect(routes.home);
};
    
export const logout = (req, res) => 
    res.render("logout", { pageTitle: "Logout" });
export const userDetail = (req, res) => 
    res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) => 
    res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => 
    res.render("changePassword", { pageTitle: "Change Password" });