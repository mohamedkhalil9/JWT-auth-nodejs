import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            // user.verifed = profile.emails[0].verified;
            await user.save();

            return cb(null, user);
          } else {
            return cb(null, user);
          }
        }

        const newUser = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profileImg: profile.photos[0].value,
          googleId: profile.id,
          provider: "google",
          verifed: profile.emails[0].verified,
        });

        return cb(null, newUser);
      } catch (err) {
        cb(err, null);
      }
    },
  ),
);
