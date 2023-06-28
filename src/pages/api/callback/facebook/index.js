// pages/api/callback/facebook.js
import axios from "axios";

export default async (req, res) => {
  const { code } = req.query;
  console.log(code);

  if (!code) {
    console.log("Authorization code is required");
    res.redirect("/accounts");
  }

  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
  const redirectURI = process.env.FACEBOOK_REDIRECT_URI;

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.get(
      `https://graph.facebook.com/v17.0/oauth/access_token?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectURI
      )}&client_secret=${clientSecret}&code=${code}`
    );

    const { access_token: accessToken } = tokenResponse.data;

    // Fetch user data
    const userProfileResponse = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );

    const { id, name, email, picture } = userProfileResponse.data;

    // Construct account object
    const account = {
      access_token: accessToken,
      user_id: id,
      email_address: email,
      full_name: name,
      profile_image: picture.data.url,
      social_media: "Facebook",
      account_id: `Facebook${id}`,
    };

    if (account) {
      // Send script to browser to save account data in sessionStorage and redirect
      res.setHeader("Content-Type", "text/html");
      res.end(`
                <script>
                    sessionStorage.setItem('account', JSON.stringify(${JSON.stringify(
                      account
                    )}));
                    window.location.href = '/accounts';
                </script>
            `);
    } else {
      // Access token failed to be generated
      res
        .status(200)
        .json({ message: "Access token failed to be sent to session" });
    }
  } catch (error) {
    console.error("Error fetching access token", error);
    res.status(500).json({ error: "Error fetching access token" });
  }
};
