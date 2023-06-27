// pages/api/validateToken.js
import crypto from 'crypto';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accessToken, accessTokenKey, mediaType } = req.body;

    // doing linkedin authentication
    if (mediaType === 'LinkedIn') {
      try {
        const response = await fetch('https://api.linkedin.com/v2/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Forward the response status to the client
        res.status(response.status).json({ isValid: response.ok });
      } catch (error) {
        res.status(500).json({ error: 'Failed to check LinkedIn token!' });
      }
    } else if (mediaType === 'Twitter') {
      // const twitterConsumerKey = process.env.TWITTER_API_KEY;
      // const twitterConsumerSecret = process.env.TWITTER_API_SECRET_KEY;

      // const baseUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
      // const method = 'GET';
      // const timestamp = Math.floor(Date.now() / 1000);
      // const nonce = crypto.randomBytes(16).toString('base64');

      // let parameterString = `oauth_consumer_key=${twitterConsumerKey}&oauth_nonce=${nonce}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${timestamp}&oauth_token=${accessToken}&oauth_version=1.0&count=1`;
      // let signatureBaseString = `${method}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(parameterString)}`;
      // let signingKey = `${encodeURIComponent(twitterConsumerSecret)}&${encodeURIComponent(accessTokenKey)}`;
      // let oauthSignature = crypto.createHmac('sha1', signingKey).update(signatureBaseString).digest().toString('base64');

      // let authorizationHeader = `OAuth oauth_consumer_key="${twitterConsumerKey}", oauth_nonce="${nonce}", oauth_signature="${oauthSignature}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${timestamp}", oauth_token="${accessToken}", oauth_version="1.0"`;

      // try {
      //     const response = await fetch(`${baseUrl}?count=1`, {
      //         method: 'GET',
      //         headers: {
      //             Authorization: authorizationHeader
      //         }
      //     });

      //     // Check if the response is ok (status code within the range 200-299)
      //     if (response.ok) {
      //         // Forward the response status to the client
      //         return res.status(response.status).json({ isValid: true });
      //     } else {
      //         // Read and log the response body to see the error message
      //         const responseBody = await response.json();
      //         console.error('Twitter API responded with an error:', responseBody);
      //         return res.status(response.status).json({ isValid: false, error: responseBody });
      //     }

      // } catch (error) {
      //     console.error('Error while verifying twitter token', error);
      //     return res.status(500).json({ error: 'Failed to check twitter token!' });
      // }
      res.status(200).json({ isValid: 1 });
    } else {
      res.status(200).json({ isValid: 1 });
    }
  }
}
