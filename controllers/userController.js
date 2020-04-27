import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { RSA_NO_PADDING } from "constants";

export const getJoin = (req, res) => {
    console.log("getJoin");
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
    console.log(req.body);
    const {
        body: { name, email, password, password2 }
    } = req;
    if (password !== password2) {
        req.flash("error", "Password do not match");
        res.status(400);    // 400: bad request
        res.render("join", { pageTitle: "Join" });
    } else {
        // to do: Register User
        try {
            const user = User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};

// export const postLogin = (req,res) => {
//     // 로그인시 db의 비밀번호와 비교하여 true면 Home으로, error가 있으면 login 화면 표시
//     res.redirect(routes.home);
// };
    
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    // successRedirect: routes.home
    successRedirect: routes.home,
    successFlash: "Welcome",
    failureFlash: "Can't log in. Check email and/or password"
});

export const githubLogin = passport.authenticate("github", {
    successFlash: "Welcome",
    failureFlash: "Can't log in at this time"
});

export const githubLoginCallback = async (_, __, profile, cb) => {
    // console.log(accessToken, refreshToken, profile, cb);
    const { 
        _json: {
            id,
            avatar_url: avatarUrl,
            name,
            email
        }
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githunId = id;
            user.save();
            return cb(null, user);
        } 
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
};

// export const facebookLogin = passport.authenticate("facebook", {
//    successFlash: "Welcome",
//    failureFlash: "Can't log in at this time"
// });

// export const facebookLoginCallback = async (_, __, profile, cb) => {
//     const {
//       _json: { id, name, email }
//     } = profile;
//     try {
//         const user = await User.findOne({ email });
//         if (user) {
//         user.facebookId = id;
//         user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
//         user.save();
//         return cb(null, user);
//       }
//       const newUser = await User.create({
//         email,
//         name,
//         facebookId: id,
//         avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
//       });
//       return cb(null, newUser);
//     } catch (error) {
//       return cb(error);
//     }
//   };

// export const postFacebookLogin = (req, res) => {
//     res.redirect(routes.home);
// };

export const logout = (req, res) => {
    req.flash("info", "Logged out, see you later");
    req.logout();
    // todo: Process Log out
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};  

export const userDetail = async (req, res) => {
    // res.render("userDetail", { pageTitle: "User Detail" });
    const { 
        params: { id } 
    } = req;
    try {
        // const user = await User.findById(id);
        const user = await (await User.findById(id)).populated("video");
        console.log(user);
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
        req.flash("error", "User not found");
        res.redirect(routes.home);
    }
};
    
export const getEditProfile = (req, res) => 
    res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
    const  {
        body: { name, email },
        file
    } = req;
    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        req.flash("success", "Profile updated");
        res.redirect(routes.me);
    } catch (error) {
        req.flash("error", "Can't update profile");
        res.render(routes.editProfile);
    }
};

export const getChangePassword = (req, res) => 
    res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
        if (newPassword !== newPassword1) {
            req.flash("error", "Passwords don't match");
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        req.flash("error", "Can't change password");
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
};