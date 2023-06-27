// pages/api/twitter_auth.js
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Twitter consumer API keys
      const consumerKey = process.env.TWITTER_API_KEY;
      const consumerSecret = process.env.TWITTER_API_SECRET_KEY;

      // OAuth instance
      const oauth = OAuth({
        consumer: {
          key: consumerKey,
          secret: consumerSecret,
        },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
          return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64');
        },
      });

      // Request token URL
      const requestTokenURL = 'https://api.twitter.com/oauth/request_token';

      // OAuth headers
      const authHeader = oauth.toHeader(
        oauth.authorize({
          url: requestTokenURL,
          method: 'POST',
        })
      );

      // Fetch request token
      const tokenRes = await fetch(requestTokenURL, {
        method: 'POST',
        headers: { Authorization: authHeader['Authorization'] },
      });

      // Parse the response
      const body = await tokenRes.text();
      const oauthToken = body.match(/oauth_token=([^&]*)/)[1];
      const oauthTokenSecret = body.match(/oauth_token_secret=([^&]*)/)[1];

      // Redirect user to Twitter for authentication
      res.redirect(
        `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
      );
    } catch (error) {
      res.status(500).json({ error: 'Twitter Authentication failed.' });
    }
  } else {
    res.status(405).json({ error: 'This endpoint requires a GET request.' });
  }
}
