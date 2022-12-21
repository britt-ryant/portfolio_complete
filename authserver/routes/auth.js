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
    console.log(`in google`);
    passport.authenticate("google", ["profile", "email"])
    
}
);
router.get('/logout', (req, res) => {
    console.log(`hit it`);
    req.logout();
    //res.redirect(process.env.CLIENT_URL)
});

module.exports = router;