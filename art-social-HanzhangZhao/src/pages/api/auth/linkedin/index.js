// pages/api/auth.js
// this api sends the authentication request to the user and get the authorization code back

import assert from 'assert';

export default (req, res) => {
  // Apply the session middleware
  const clientId = process.env.CONTENTFUL_LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.CONTENTFUL_LINKEDIN_CLIENT_SECRET;
  const authorizationURL = process.env.CONTENTFUL_LINKEDIN_AUTHORIZATION_URL;
  const redirectURI = process.env.CONTENTFUL_LINKEDIN_REDIRECT_URI;
  const accessTokenURL = process.env.CONTENTFUL_LINKEDIN_ACCESS_TOKEN_URL;

  assert(clientId, 'clientId is required');
  assert(clientSecret, 'clientSecret is required');
  assert(authorizationURL, 'authorizationURL is required');
  assert(redirectURI, 'redirectURI is required');
  assert(accessTokenURL, 'accessTokenURL is required');

  // Redirect the user to LinkedIn's authorization URL
  const state = Buffer.from(
    Math.round(Math.random() * Date.now()).toString()
  ).toString('hex');
  const scope = encodeURIComponent(
    'r_liteprofile r_emailaddress w_member_social'
  );

  const authorizationUrl = `${authorizationURL}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectURI
  )}&state=${state}&scope=${scope}`;

  res.redirect(authorizationUrl);
};
