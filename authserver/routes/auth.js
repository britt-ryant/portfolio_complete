const router = require("express").Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
    if(req.user){
        res.status(200).json({
            error: false,
            message: "Log in Success",
            user: req.user
        })
    }else {
        res.status(403).json({error: true, message: "Not Authorized"})
    }
})
router.get("/login/failed", (req, res) => {
    console.log(`failure`);
    res.status(401).json({
        error: true,
        message: "Log In Failure"
    })
})

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed"
    })
)

router.get('/google', (req, res) => {
    passport.authenticate("google", ["profile", "email"])
}
);
router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed"
    })
)

router.get('/github', (req, res) => {
    passport.authenticate("github",{scope: ["user:email"] } )
}
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL)
});

module.exports = router;