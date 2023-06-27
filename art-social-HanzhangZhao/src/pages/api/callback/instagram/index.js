// pages/api/callback/instagram.js
import axios from 'axios';

export default async (req, res) => {
  const { code } = req.query;

  if (!code) {
    console.log('Authorization code is required');
    res.redirect('/accounts');
  }

  const params = new URLSearchParams();
  params.append('client_id', process.env.INSTAGRAM_CLIENT_ID);
  params.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', process.env.INSTAGRAM_REDIRECT_URI);
  params.append('code', code);

  try {
    const tokenResponse = await axios.post(
      'https://api.instagram.com/oauth/access_token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token: accessToken, user_id: userId } = tokenResponse.data;

    // Fetch user data from Instagram API
    const userData = await axios.get(
      `https://graph.instagram.com/${userId}?fields=id,username,account_type,media_count&access_token=${accessToken}`
    );

    const { username } = userData.data;

    // Construct the account object
    const account = {
      access_token: accessToken,
      user_id: userData.data.id,
      full_name: username,
      social_media: 'Instagram',
      account_id: `Instagram${userData.data.id}`,
    };

    if (account) {
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
      res
        .status(200)
        .json({ message: 'Access token failed to be sent to session' });
    }
  } catch (error) {
    console.error('Error fetching access token', error);
    res.status(500).json({ error: 'Error fetching access token' });
  }
};
