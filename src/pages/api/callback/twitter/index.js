import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import queryString from 'querystring';

// initialize oauth
const oauth = OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { oauth_token, oauth_verifier } = req.query;

    const request_data = {
      url: 'https://api.twitter.com/oauth/access_token',
      method: 'POST',
      data: { oauth_verifier },
    };

    const token = {
      key: oauth_token,
      secret: process.env.TWITTER_TOKEN_SECRET,
    };

    try {
      const response = await fetch(request_data.url, {
        method: request_data.method,
        headers: oauth.toHeader(oauth.authorize(request_data, token)),
      });

      const responseData = await response.text();
      const accessTokenData = queryString.parse(responseData);

      if (!response.ok) {
        return res.status(response.status).json({
          error: 'Failed to fetch access token',
          details: accessTokenData,
        });
      }

      // Now, let's use the access token to fetch user's email address
      const userRequestData = {
        url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
        method: 'GET',
      };

      const userToken = {
        key: accessTokenData.oauth_token,
        secret: accessTokenData.oauth_token_secret,
      };

      // get user's email address
      // we need higher level of developer account to get access to profile info (images)
      const userResponse = await fetch(`${userRequestData.url}`, {
        method: userRequestData.method,
        headers: oauth.toHeader(oauth.authorize(userRequestData, userToken)),
      });

      const user = await userResponse.json();

      // Combining account data and email address
      const account = {
        access_token: accessTokenData.oauth_token,
        access_token_key: accessTokenData.oauth_token_secret,
        user_id: accessTokenData.user_id,
        // for now email_address and profile_image are null because we do not have access to the profile
        email_address: user.email,
        profile_image: user.profile_image_url_https,
        full_name: accessTokenData.screen_name,
        social_media: 'Twitter',
        // by setting the social_media, we can retrieve a user's certain account using its social_media type and the user_id
        // unique accountId
        account_id: `Twitter${accessTokenData.user_id}`,
      };

      if (account) {
        // Send a script to the browser to save accessToken in sessionStorage and then redirect
        res.setHeader('Content-Type', 'text/html');
        res.end(`
                    <script>
                        sessionStorage.setItem('account', JSON.stringify(${JSON.stringify(
                          account
                        )}));
                        window.location.href = '/accounts';
                    </script>
                `);
      } else {
        // access token failed to be sent to session
        res
          .status(200)
          .json({ message: 'Access token failed to be sent to session' });
      }

      // Redirect to homepage or dashboard
      return res.redirect('/accounts');
    } catch (error) {
      console.error('Error fetching access token or user information:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
