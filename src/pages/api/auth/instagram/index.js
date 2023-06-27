// pages/api/auth/instagram.js
export default (req, res) => {
  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  const redirectURI = process.env.INSTAGRAM_REDIRECT_URI;
  const authorizationURL = 'https://api.instagram.com/oauth/authorize';

  const state = Buffer.from(
    Math.round(Math.random() * Date.now()).toString()
  ).toString('hex');
  const scope = encodeURIComponent('user_profile,user_media');

  const authorizationUrl = `${authorizationURL}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectURI
  )}&scope=${scope}&response_type=code&state=${state}`;

  res.redirect(authorizationUrl);
};
