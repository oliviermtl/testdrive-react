const { sessionMiddleware, unstable_simpleRolesIsAuthorized } = require("@blitzjs/server")

module.exports = {
  middleware: [
    sessionMiddleware({
      unstable_isAuthorized: unstable_simpleRolesIsAuthorized,
    }),
  ],
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    CLIENT_ID: process.env.CLIENT_ID
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
