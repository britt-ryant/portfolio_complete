const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope:["profile", "email"],
        },
        function(accessToken, refreshToken, profile, callback){
            callback(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    // console.log(`serializer`);
    // console.log(user);
    done(null, user)
});

passport.deserializeUser((user, done) => {
    // console.log(`HEREREREEERERRER`);
    done(null, user)
})