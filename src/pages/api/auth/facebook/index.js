// pages/api/auth/facebook/index.js

export default (req, res) => {
  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const redirectURI = process.env.FACEBOOK_REDIRECT_URI;
  const authorizationURL = "https://www.facebook.com/v17.0/dialog/oauth";

  const state = Buffer.from(
    Math.round(Math.random() * Date.now()).toString()
  ).toString("hex");
  const scope = encodeURIComponent("email,public_profile");

  const authorizationUrl = `${authorizationURL}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectURI
  )}&state=${state}&scope=${scope}&response_type=code`;

  res.redirect(authorizationUrl);
};
