// app/api/auth/[...auth].ts
import { passportAuth } from "blitz"
import db from "db"
import { Strategy as TwitterStrategy } from "passport-twitter"
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  authenticateOptions: { scope: "openid email profile" },
  strategies: [
    // Provide initialized passport strategy here
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        bearerToken: "AAAAAAAAAAAAAAAAAAAAAJmCIwEAAAAAlbIG9%2BjgCrpIuAxmAR6tGjmsc3Y%3DkRqzi3BAmR1A8OMD5aaUleyylplbw4PrPiovY2cuTe4MIPpe4E",
        callbackURL:
          process.env.NODE_ENV === "production"
            ? "https://example.com/api/auth/twitter/callback"
            : "http://127.0.0.1:3000/api/auth/twitter/callback",
        includeEmail: true,
      },
      async function (_token, _tokenSecret, profile, done) {
        const email = profile.emails && profile.emails[0]?.value
        if (!email) {
          // This can happen if you haven't enabled email access in your twitter app permissions
          return done(new Error("Twitter OAuth response doesn't have email."))
        }
        const user = await db.user.upsert({
          where: { email },
          create: {
            email,
            name: profile.displayName,
          },
          update: { email },
        })
        const publicData = { userId: user.id, roles: [user.role], source: "twitter" }
        done(null, { publicData })
      },
    ),
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/api/auth/google/callback",
        includeEmail: true,
      },
      async function (_token, _tokenSecret, profile, done) {
        const email = profile.emails && profile.emails[0]?.value
        if (!email) {
          return done(new Error("Google OAuth response doesn't have email."))
        }
        const user = await db.user.upsert({
          where: { email },
          create: {
            email,
            name: profile.displayName,
          },
          update: { email },
        })
        const publicData = { userId: user.id, roles: [user.role], source: "google" }
        done(null, { publicData })
      },
    ),
  ],
})