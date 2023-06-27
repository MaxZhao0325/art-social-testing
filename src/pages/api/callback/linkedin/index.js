// pages/api/callback.js
// this api exchanges the authorization code to access token and send the access token to the client side for storage
import axios from 'axios';
import fetch from 'node-fetch';

export default async (req, res) => {
  const { code } = req.query;

  if (!code) {
    //   res.status(400).json({ error: 'Authorization code is required' });
    console.log('Authorization code is required');
    res.redirect('/accounts');
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', process.env.CONTENTFUL_LINKEDIN_REDIRECT_URI);
  params.append('client_id', process.env.CONTENTFUL_LINKEDIN_CLIENT_ID);
  params.append('client_secret', process.env.CONTENTFUL_LINKEDIN_CLIENT_SECRET);

  try {
    const response = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token: accessToken, expires_in: expiresIn } = response.data;

    // Fetch additional user data from LinkedIn API
    const userProfile = await axios.get('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userEmail = await axios.get(
      'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Fetch the LinkedIn user's profile image using access token
    const profilePicResponse = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const profilePicData = await profilePicResponse.json();
    const profilePicture =
      profilePicData.profilePicture &&
      profilePicData.profilePicture['displayImage~'] &&
      profilePicData.profilePicture['displayImage~'].elements &&
      profilePicData.profilePicture['displayImage~'].elements[0] &&
      profilePicData.profilePicture['displayImage~'].elements[0].identifiers &&
      profilePicData.profilePicture['displayImage~'].elements[0]
        .identifiers[0] &&
      profilePicData.profilePicture['displayImage~'].elements[0].identifiers[0]
        .identifier;

    // Construct the account object
    const account = {
      access_token: accessToken,
      user_id: userProfile.data.id,
      email_address: userEmail.data.elements[0]['handle~'].emailAddress,
      first_name: userProfile.data.localizedFirstName,
      last_name: userProfile.data.localizedLastName,
      full_name:
        userProfile.data.localizedFirstName +
        ' ' +
        userProfile.data.localizedLastName,
      profile_image: profilePicture,
      social_media: 'LinkedIn',
      // by setting the social_media, we can retrieve a user's certain account using its social_media type and the user_id
      // unique accountId
      account_id: `LinkedIn${userProfile.data.id}`,
      access_token_expires_in: expiresIn,
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
      // access token failed to be generated
      res
        .status(200)
        .json({ message: 'Access token failed to be sent to session' });
    }
  } catch (error) {
    console.error('Error fetching access token', error);
    res.status(500).json({ error: 'Error fetching access token' });
  }
};
