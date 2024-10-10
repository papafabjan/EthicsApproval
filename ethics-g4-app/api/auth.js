const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();
const pool = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const account = profile._json;
      let user = {};

      try {
        const currentUserQuery = await pool.query(
          "SELECT * FROM users WHERE google_id=$1",
          [account.sub]
        );

        if (currentUserQuery.rows.length === 0) {
          // Create user
           await pool.query(
             "INSERT INTO users (username, img, email, google_id, role, access_token, refresh_token) VALUES ($1, $2, $3, $4, $5, $6, $7)",
             [
               account.name,
               account.picture,
               account.email,
               account.sub,
               "student", // Set a default value for role
               accessToken,
               refreshToken || "", // Set a default value for refresh_token
             ]
           );


          const id = await pool.query(
            "SELECT user_id FROM users WHERE google_id=$1",
            [account.sub]
          );
          user = {
            id: id.rows[0].id,
            username: account.name,
            img: account.picture,
            email: account.email, // Include the email in the user object
            role: account.role,
            accessToken,
            refreshToken,
          };
        } else {
          // User exists
          user = {
            id: currentUserQuery.rows[0].google_id,
            username: currentUserQuery.rows[0].username,
            img: currentUserQuery.rows[0].img,
            email: currentUserQuery.rows[0].email,
            role: currentUserQuery.rows[0].role,
            accessToken,
            refreshToken,
            admin_of_department: currentUserQuery.rows[0]?.admin_of_department,
          };
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
      console.log(account);
    }
  )
);

passport.serializeUser((user, done) => {
  // loads into req.session.passport.user
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // loads into req.user
  done(null, user);
});
